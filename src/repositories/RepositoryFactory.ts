import { useLoginRepository } from './loginRepository';
import type { LoginRepository } from './loginRepository';

// 全てのリポジトリを紐付ける
export type Repositories = {
  login: LoginRepository;
};

// 個別のリポジトリを管理する配列
const repositories = {
  login: useLoginRepository(),
} as Repositories;

// getを使うと呼びたいリポジトリを指定できる
export const RepositoryFactory = {
  get: (name: keyof Repositories): Repositories[keyof Repositories] => repositories[name],
};
