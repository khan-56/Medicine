import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Company } from './company.entity';

@Entity({ name: 'medicines' })
export class Medicine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name_en: string;

  @Column({ nullable: true })
  name_bn: string;

  @Column({ nullable: true })
  generic_name: string;

  @Column({ nullable: true })
  brand_name: string;

  @ManyToOne(() => Company, (c) => c.medicines, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column({ type: 'jsonb', nullable: true })
  composition: any;

  @Column({ nullable: true })
  form: string;

  @Column({ nullable: true })
  strength: string;

  @Column({ type: 'jsonb', nullable: true })
  indications: string[];

  @Column({ type: 'jsonb', nullable: true })
  contraindications: string[];

  @Column({ type: 'jsonb', nullable: true })
  side_effects: string[];

  @Column({ type: 'jsonb', nullable: true })
  regulatory_status: any;

  @Column({ type: 'jsonb', nullable: true })
  sources: any;
}
