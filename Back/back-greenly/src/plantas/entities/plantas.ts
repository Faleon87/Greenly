import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
