import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserType } from '../interfaces/user-type.enum';

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn({ type: 'integer' })
	id: number;

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
