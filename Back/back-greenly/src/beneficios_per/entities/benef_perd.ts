import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Plantas } from '../../plantas/entities/plantas';

@Entity('BeneficiosPerjudiciales')
export class BenefPerd {
  @PrimaryGeneratedColumn()
  idBeneficioPerjudicial: number;

  @ManyToOne(() => Plantas, planta => planta.benefPerd)
  @JoinColumn({ name: 'idPlanta' })
  planta: Plantas;

  @Column()
  idPlanta: number;

  @Column('boolean')
  boolean: boolean;
}