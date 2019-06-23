import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn} from 'typeorm';
import {Transaction} from './transaction.model';
import {UserEntity} from '../user/user.entity';
import {User} from '../user/user.model';

const numericTransformer = {
    to: (data) => data,
    from: parseFloat,
};

@Entity()
export class TransactionEntity implements Transaction {
    @PrimaryColumn('varchar')
    id: string;

    @Column({ type: 'varchar', length: 20 })
    name: string;

    @Column({ type: 'decimal', transformer: numericTransformer })
    value: number;

    @Column({ type: 'varchar', length: 20 })
    type: string;

    @Column({ type: 'varchar', length: 50 })
    description: string;

    @Column({ type: 'bigint', transformer: numericTransformer })
    date: number;

    @CreateDateColumn({ select: false })
    createDate?: any;

    @UpdateDateColumn({ select: false })
    updateDate?: any;

    @ManyToOne(type => UserEntity, user => user.transactions, { eager: false })
    user: User;
}
