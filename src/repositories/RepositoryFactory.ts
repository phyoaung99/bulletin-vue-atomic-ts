import { useLoginRepository } from './loginRepository';
import type { LoginRepository } from './loginRepository';
import { usePostRepository, type postRepository } from './postRepository';

// 全てのリポジトリを紐付ける
export type Repositories = {
  login: LoginRepository;
  post : postRepository;
};

// 個別のリポジトリを管理する配列
const repositories = {
  login: useLoginRepository(),
  post : usePostRepository(),
} as Repositories;

// getを使うと呼びたいリポジトリを指定できる
export const RepositoryFactory = {
  get: (name: keyof Repositories): Repositories[keyof Repositories] => repositories[name],
};
