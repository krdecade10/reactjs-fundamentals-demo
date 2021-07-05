export interface LoginContextState {
    profile: LoginProfile;
    saveLoginProfile: (profile: LoginProfile) => void;
    deleteLoginProfile: () => void;
}

export interface LoginProfile {
    isLogin: boolean;
    userId: number;
    name: string;
}