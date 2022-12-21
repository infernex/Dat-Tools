export interface CurrentUser {
    id: string;
    userName: string;
    email: string;
    isAdmin: boolean;
    isStudent: boolean;
    isInstructor: boolean;
    firstLogin: boolean;
    UrlProfilePicture: string;
    roles: string[];
    permissions: string[];
}