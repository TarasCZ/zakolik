import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn} from 'typeorm';
import {User} from './user.model';
import {Transaction} from '../transactions/transaction.model';
import {TransactionEntity} from '../transactions/transaction.entity';
import {UserSettingsEntity} from '../user-settings/user-settings.entity';

@Entity()
export class UserEntity implements User {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    nickname: string;

    @Column()
    email: string;

    @OneToOne(type => UserSettingsEntity, settings => settings.user)
    settings?: UserSettingsEntity;

    @OneToMany(type => TransactionEntity, transaction => transaction.user, {eager: false})
    transactions?: Transaction[];
}