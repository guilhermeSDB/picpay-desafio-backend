import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../core/base.entity';
import { UserType } from '../interfaces/user-type.enum';

@Entity({ name: 'users' })
export class User extends BaseEntity {
	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column({ unique: true })
	document: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column({ type: 'bigint' })
	balance: number;

	@Column({
		type: 'enum',
		enum: UserType,
		default: UserType.COMMON,
	})
	userType: UserType;
}
