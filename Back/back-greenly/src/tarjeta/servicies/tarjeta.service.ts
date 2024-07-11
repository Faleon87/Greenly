import { Injectable } from '@nestjs/common';
import { Tarjeta } from '../entities/tarjeta';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

@Injectable()
export class TarjetaService {

    constructor(
        @InjectRepository(Tarjeta)
        private tarjetaRepository: Repository<Tarjeta>,
    ) { }


    async keepTarjeta(idUsuario: number, cardNumber: string, name: string, expiry: string, cvv: number) {

        console.log('cvv', cvv);
    
        // Verificar que cvv sea un número válido
        if (isNaN(cvv)) {
            throw new Error('CVV debe ser un número válido');
        }
    
    
        const cardHash = crypto.createHash('sha256').update(cardNumber).digest('hex');
    
        // Comprobar si la tarjeta ya existe usando el hash
        const existingCard = await this.tarjetaRepository.findOne({ where: { cardhash: cardHash, idUser: idUsuario } });
        if (existingCard) {
            return { success: false, message: 'Lo siento, pero esta tarjeta ya existe.' };
        } else {
            // Cifrar los datos
            const { encryptedCardNumber, encryptedCvv, encryptedName, encryptedExpiry, key, iv } = this.encryptCardData(cardNumber, cvv.toString(), name, expiry);
    
            // Guardar la tarjeta en la base de datos
            const tarjeta = new Tarjeta();
            tarjeta.idUser = Number(idUsuario);
            tarjeta.numeroTarjeta = encryptedCardNumber;
            tarjeta.nombre = encryptedName;
            tarjeta.fechaVencimiento = encryptedExpiry; // Almacenar la fecha cifrada
            tarjeta.codigoSeguridad = encryptedCvv; // Almacenar como cadena
            tarjeta.cardhash = cardHash; // Guardar el hash del número de tarjeta
 
    
            await this.tarjetaRepository.save(tarjeta);
            return { success: true, message: 'Tarjeta guardada.' };
        }
    }
    private encryptCardData(cardNumber: string, cvv: string, name: string, expiry: string) {
        const algorithm = 'aes-256-cbc';
        const key = crypto.randomBytes(32);
        const iv = crypto.randomBytes(16);
    
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let encryptedCardNumber = cipher.update(cardNumber, 'utf8', 'hex');
        encryptedCardNumber += cipher.final('hex');
    
        const cipherCvv = crypto.createCipheriv(algorithm, key, iv);
        let encryptedCvv = cipherCvv.update(cvv, 'utf8', 'hex');
        encryptedCvv += cipherCvv.final('hex');
    
        const cipherName = crypto.createCipheriv(algorithm, key, iv);
        let encryptedName = cipherName.update(name, 'utf8', 'hex');
        encryptedName += cipherName.final('hex');
    
        const cipherExpiry = crypto.createCipheriv(algorithm, key, iv);
        let encryptedExpiry = cipherExpiry.update(expiry, 'utf8', 'hex');
        encryptedExpiry += cipherExpiry.final('hex');
    
        return { encryptedCardNumber, encryptedCvv, encryptedName, encryptedExpiry, key, iv };
    }
}