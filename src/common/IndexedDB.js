/* eslint-disable no-console */
/* eslint-disable no-alert */
import { randomString } from '../utils/stringUtils';
import questionJSON from './question.json';

export default class IndexedDB {
  constructor() {
    if (!window.indexedDB) {
      console.error('Not Support Browser');
      alert('Not Support Browser');
    }
  }

  init() {
    return new Promise((resolve, reject) => {
      this.openRequest = window.indexedDB.open('QuestionsDB', 1);
      this.openRequest.onerror = event => {
        console.error(`Database error: ${event.target.errorCode}`);
        reject(event.target.errorCode);
      };

      this.openRequest.onupgradeneeded = event => {
        this.#upgradeDB(event);
      };

      this.openRequest.onsuccess = async event => {
        this.db = this.openRequest.result;
        this.db.onversionchange = () => {
          this.db.close();
          console.error('Database is outdated, please reload the page.');
          reject(event.target);
        };

        resolve(this);
      };
    });
  }

  #prepareJSON() {
    const { questionList } = JSON.parse(JSON.stringify(questionJSON));
    return questionList.map(question => ({
      ...question,
      id: randomString(8),
    }));
  }

  #upgradeDB(event) {
    // DB store 스키마 생성
    const db = event.target.result;
    if (!db.objectStoreNames.contains('questions')) {
      const questionStore = db.createObjectStore('questions', {
        keyPath: 'id',
      });

      this.#prepareJSON().forEach(question => questionStore.add(question));
    }
  }

  getAll() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['questions'], 'readonly');
      const questionStore = transaction.objectStore('questions');
      const request = questionStore.getAll();

      request.onsuccess = event => {
        const questionList = event.target.result;
        resolve(questionList);
      };

      request.onerror = event => {
        reject(event.target);
      };
    });
  }

  addOne(question) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['questions'], 'readwrite');
      const questionStore = transaction.objectStore('questions');
      const request = questionStore.add(question);

      request.onsuccess = event => {
        const questionList = event.target.result;
        resolve(questionList);
      };

      request.onerror = event => {
        reject(event.target);
      };
    });
  }
}
