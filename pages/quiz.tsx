import dynamic from 'next/dynamic';
const Quiz = dynamic(() => import('../components/Quiz'), { ssr: false });

const QuizPage: React.FC = () => <Quiz />;

export default QuizPage;
