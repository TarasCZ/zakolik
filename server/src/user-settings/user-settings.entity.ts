import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {UserEntity} from '../user/user.entity';
import {UserSettings} from './user-settings.model';

@Entity()
export class UserSettingsEntity implements UserSettings {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @OneToOne(type => UserEntity, user => user.settings, { eager: false })
    user: UserEntity;

    @Column('varchar')
    language: string;

    @Column('varchar')
    theme: string;

    @Column('boolean')
    stickyHeader: boolean;

    @Column('boolean')
    pageAnimations: boolean;

    @Column('boolean')
    elementsAnimations: boolean;

    @Column('varchar')
    picture: string;
}