import * as bcrypt from 'bcrypt';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../entities/user';
import * as dotenv from 'dotenv';
import { CreateUserDto } from '../dtos/create-user-dto';
import { UpdateUserDto } from '../dtos/update-dto';
import * as nodemailer from 'nodemailer';

dotenv.config();
@Injectable()
export class UserService {
  private transporter: nodemailer.Transporter;
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASS, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false, // Para evitar errores con certificados autofirmados
      },
    });
  }

  // Método para iniciar sesión
  async login(
    username: string,
    password: string,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: [{ username: username }, { email: username }],
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (
      !user.password ||
      !password ||
      !(await bcrypt.compare(password, user.password))
    ) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async onModuleInit(): Promise<void> {
    try {
      dotenv.config();
    } catch (error) {
      console.log('Error al cargar las variables de entorno');
    }
    let adminUser = await this.userRepository.findOne({
      where: { username: 'admin' },
    });
    if (!adminUser) {
      adminUser = new User();
      adminUser.username = process.env.ADMIN_USERNAME;
      adminUser.email = process.env.ADMIN_EMAIL;
      adminUser.nombre = process.env.ADMIN_NAME;
      adminUser.apellido = process.env.ADMIN_LASTNAME;
    }
    const salt = await bcrypt.genSalt();
    if (process.env.ADMIN_PASSWORD) {
      adminUser.password = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);
      await this.userRepository.save(adminUser);
    } else {
      throw new Error('ADMIN_PASSWORD is not defined');
    }
  }

  async register(userDetails: CreateUserDto): Promise<User> {
    const { password, img, username, ...otherDetails } = userDetails;

    // Verificar si el username ya existe
    const existingUser = await this.userRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    // Hashear la contraseña
    const hashedPassword = await this.hashPassword(password);

    // Convertir la imagen Base64 a Buffer
    const imgBuffer = img ? Buffer.from(img.toString(), 'base64') : null;

    const newUser = this.userRepository.create({
      ...otherDetails,
      username,
      password: hashedPassword,
      img: imgBuffer,
    });

    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: ["nombre", "img", "idUser"]
    });
  }

  async getProfile(idUser: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { idUser } });
    if (!user) {
      throw new NotFoundException(`User with ID ${idUser} not found`);
    }
    return user;
  }

  async update(idUser: number, updatedData: UpdateUserDto): Promise<User> {
    console.log('Received updatedData:', updatedData);

    // Si se recibe una contraseña, se encripta antes de guardarla.
    if (updatedData.password) {
      updatedData.password = await this.hashPassword(updatedData.password);
    }

    // Cargar el usuario existente por id
    const existingUser = await this.userRepository.findOne({ where: { idUser } });

    // Log adicional para verificar el estado de existingUser
    console.log('Existing user:', existingUser);

    // Si no se encuentra el usuario, lanza una excepción.
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${idUser} not found`);
    }

    // Mezclar los cambios en el usuario existente
    const userToUpdate = this.userRepository.merge(existingUser, updatedData);

    // Log adicional para verificar el estado de userToUpdate
    console.log('User to update:', userToUpdate);

    // Guarda el usuario actualizado en la base de datos.
    return this.userRepository.save(userToUpdate);
  }

  async getPerfil(idUser: number): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { idUser },
      select: ['img'], // Seleccionar solo el campo 'img'
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${idUser} not found`);
    }

    // Convertir el Buffer a Base64
    return user.img.toString('base64');
  }


  // Método para generar una contraseña aleatoria
  private generateRandomPassword(): string {
    // Implementa tu lógica para generar una contraseña aleatoria
    return Math.random().toString(36).slice(-8); // Ejemplo simple
  }


  // Método para recuperar la contraseña y enviar correo
  async recoverPassword(email: string): Promise<string> {
    console.log(`Recovering password for ${email}`);

    // Verificar si el correo electrónico existe
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      console.log(`User with email ${email} not found`);
      return `Lo siento, este correo no existe`;
    }

    // Generar una nueva contraseña
    const newPassword = this.generateRandomPassword();
    console.log(`New password for ${email}: ${newPassword}`);

    // Encriptar la nueva contraseña
    const hashedPassword = await this.hashPassword(newPassword);
    console.log(`Hashed password: ${hashedPassword}`);

    // Actualizar la contraseña del usuario en la base de datos
    user.password = hashedPassword;
    await this.userRepository.save(user);

    console.log(`Password updated for ${email}`);

    // Actualizar la contraseña del usuario en la base de datos
    user.password = hashedPassword;
    await this.userRepository.save(user);

    console.log(`Password updated for ${email}`);

    // Enviar el correo electrónico con la nueva contraseña
    await this.transporter.sendMail({
      from: '"Greenly Support" <support@greenlyapp.com>', // sender address
      to: email, // list of receivers
      subject: 'Password Recovery', // Subject line
      text: `Hello ${user.nombre}, your new password is ${newPassword}. Please change your password as soon as you log in.`, // plain text body
      html: `
    <div style="text-align: center;">
      <img src="https://i.postimg.cc/j28kP7Gq/LogoGood.png" alt="Company Logo" style="width: 150px; height: auto;"/>
      <p>Hello ${user.nombre},</p>
      <p>Your new password is <b>${newPassword}</b></p>
      <p>Please change your password as soon as you log in.</p>
      <p>If you did not request a password reset, please ignore this email or contact support.</p>
    </div>
  `, // html body
    });

    console.log(`Recovery email sent to ${email}`);


    console.log(`Recovery email sent to ${email}`);

    return `Password recovery email sent to ${email}`;
  }



}
