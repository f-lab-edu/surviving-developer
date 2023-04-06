import QuestionController from './controller/QuestionController';
import QuestionModel from './model/QuestionModel';
import QuestionView from './view/question/questionView';

export default () => {
  new QuestionController(new QuestionModel(), new QuestionView());
};
