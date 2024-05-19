import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Plantas } from '../../plantas/entities/plantas';

@Entity('BeneficiosPerjudiciales')
export class BenefPerd {
  @PrimaryGeneratedColumn()
  idBeneficioPerjudicial: number;

  @ManyToOne(() => Plantas)
  idPlanta: Plantas;

  @Column('boolean')
  boolean: boolean;
}
