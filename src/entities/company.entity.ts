import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Medicine } from './medicine.entity';

@Entity({ name: 'companies' })
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name_en: string;

  @Column({ nullable: true })
  name_bn: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  logo_url: string;

  @OneToMany(() => Medicine, (m) => m.company)
  medicines: Medicine[];
}
