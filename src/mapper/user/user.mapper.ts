import { PrivateUser, PublicUser } from '../../services/user/user.types';
import { IMapper } from '../mapper.interface';


export class UserMapper implements IMapper<PrivateUser, PublicUser> {
    convert (user: PrivateUser): PublicUser {
        const publicUser: PublicUser = {
            email : user.email,
            avatar: user.email,
        };

        if (user.firstName) {
            publicUser.firstName = user.firstName;
        }

        if (user.lastName) {
            publicUser.lastName = user.lastName;
        }

        if (user.roles) {
            publicUser.roles = user.roles;
        }

        return publicUser;
    }
}