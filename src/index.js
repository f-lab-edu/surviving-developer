import './assets/global/reset.css';
import './assets/main.scss';
import Apple from './assets/images/apple.png';

const app = document.querySelector('#app');

const sampleImg = document.createElement('img');
sampleImg.src = Apple;
sampleImg.width = '304';

app.appendChild(sampleImg);
console.log('hi');
