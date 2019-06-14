import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn} from 'typeorm';
import {Transaction} from './transaction.interface';
import {UserEntity} from '../user/user.entity';
import {User} from '../user/user.interface';

const numericTransformer = {
    to: (data) => data,
    from: parseFloat,
};

@Entity()
export class TransactionEntity implements Transaction {
    @PrimaryColumn()
    id: string;

    @Column({ length: 20 })
    name: string;

    @Column({ type: 'decimal', transformer: numericTransformer })
    value: number;

    @Column({ length: 50 })
    type: string;

    @Column()
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
