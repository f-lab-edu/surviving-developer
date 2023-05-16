/* eslint-disable no-console */
import { CATEGORY_TYPE, QUESTION_TYPE } from '../utils/constants.ts';
import { randomString } from '../utils/stringUtils.ts';
import questionJSON from './question.json';

type Question = {
  answer: string;
  answerList: string[];
  category: (typeof QUESTION_TYPE)[keyof typeof QUESTION_TYPE];
  id: string;
  title: string;
  type: (typeof CATEGORY_TYPE)[keyof typeof CATEGORY_TYPE];
};

// eslint-disable-next-line no-shadow
export enum INDEXED_DB {
  DB_NAME = 'QuestionDB',
  DB_VERSION = 3,
}

export default class IndexedDB {
  private db: IDBDatabase | undefined;

  constructor() {
    if (!window.indexedDB) {
      console.error('Not Support Browser');
      alert('Not Support Browser');
    }
  }

  init(): Promise<IndexedDB> {
    return new Promise((resolve, reject) => {
      const openRequest: IDBOpenDBRequest = window.indexedDB.open(
        INDEXED_DB.DB_NAME,
        INDEXED_DB.DB_VERSION,
      );
      openRequest.onerror = () => {
        console.error('Error loading database');
      };

      openRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        this.upgradeDB(event);
      };

      openRequest.onsuccess = async (event) => {
        this.db = openRequest.result;
        this.db.onversionchange = () => {
          if (!this.db) {
            alert('Database Error');
            return;
          }
          this.db.close();
          console.error('Database is outdated, please reload the page.');
          reject(event.target);
        };

        resolve(this);
      };
    });
  }

  private prepareJSON(): Question[] {
    const { questionList }: { questionList: Question[] } = JSON.parse(
      JSON.stringify(questionJSON),
    );
    return questionList.map((question: Question) => ({
      ...question,
      id: randomString(8),
      answerList: [],
    }));
  }

  private upgradeDB(event: IDBVersionChangeEvent): void {
    // DB store 스키마 생성
    const db = (event.target as IDBRequest).result;
    if (!db.objectStoreNames.contains('questions')) {
      const questionStore = db.createObjectStore('questions', {
        keyPath: 'id',
      });

      this.prepareJSON().forEach((question: Question) =>
        questionStore.add(question),
      );
    }
  }

  getAll(): Promise<Question[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        alert('Database Error');
        return;
      }
      const transaction = this.db.transaction(['questions'], 'readonly');
      const questionStore = transaction.objectStore('questions');
      const request = questionStore.getAll();

      request.onsuccess = (event) => {
        const questionList: Question[] = (
          event.target as IDBRequest<Question[]>
        ).result;
        resolve(questionList);
      };

      request.onerror = (event) => {
        reject(event.target);
      };
    });
  }

  addAnswer(id: Question['id'], value: string): Promise<Question> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        alert('Database Error');
        return;
      }
      const transaction = this.db.transaction(['questions'], 'readwrite');
      const questionStore = transaction.objectStore('questions');
      const request: IDBRequest<Question> = questionStore.get(id);

      request.onsuccess = () => {
        const data = request.result;
        console.log(data);
        data.answerList.push(value);

        const updateRequest = questionStore.put(data);
        updateRequest.onsuccess = () => {
          resolve(data);
        };
      };

      request.onerror = (event: Event) => {
        reject(event.target);
      };
    });
  }

  addQuestion(question: Question): Promise<Question[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        alert('Database Error');
        return;
      }
      const transaction = this.db.transaction(['questions'], 'readwrite');
      const questionStore = transaction.objectStore('questions');
      const request = questionStore.add(question);

      request.onsuccess = (event) => {
        const questionList = (event.target as IDBRequest<Question[]>).result;
        resolve(questionList);
      };

      request.onerror = (event) => {
        reject(event.target);
      };
    });
  }

  deleteQuestion(id: Question['id']): Promise<Question[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        alert('Database Error');
        return;
      }
      const transaction = this.db.transaction(['questions'], 'readwrite');
      const questionStore = transaction.objectStore('questions');
      const request = questionStore.delete(id);

      request.onsuccess = (event) => {
        const questionList = (event.target as IDBRequest<Question[]>).result;
        resolve(questionList);
      };

      request.onerror = (event) => {
        reject(event.target);
      };
    });
  }
}
