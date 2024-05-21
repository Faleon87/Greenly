import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BenefPerd } from '../../beneficios_per/entities/benef_perd';

@Entity()
export class Plantas {
  @PrimaryGeneratedColumn()
  idPlanta: number;

  @Column()
  nombrePlanta: string;

  @Column()
  nombreCientifico: string;

  @Column()
  identificacion: string;

  @Column()
  img: string;

  @Column()
  siembra: string;

  @Column()
  temporadaSiembra: string;

  @Column()
  ProfundSiembra: string;

  @Column()
  distanciaPlantas: string;

  @Column()
  rotaciones: string;

  @Column()
  climaTemperatura: string;

  @Column()
  riego: string;

  @Column()
  riegoEstimado : string;

  @OneToMany(() => BenefPerd, benefPerd => benefPerd.idPlanta)
  benefPerd: BenefPerd[];
}
