import {Column, Entity, OneToMany, PrimaryColumn} from 'typeorm';
import {User} from './user.interface';
import {Transaction} from '../transactions/transaction.interface';
import {TransactionEntity} from '../transactions/transaction.entity';

@Entity()
export class UserEntity implements User {
    @PrimaryColumn()
    id: string;

    @Column({ length: 500 })
    name: string;

    @Column()
    nickname: string;

    @Column()
    email: string;

    @OneToMany(type => TransactionEntity, transaction => transaction.user, {eager: false})
    transactions: Transaction[];
}