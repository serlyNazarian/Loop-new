import MyCard from '../myCard/MyCard';
import MyStatistic from '../myStatistic/MyStatistic';

const MyCardStatistic = ({ cardProps, ...statisticProps }) => {
  return (
    <MyCard {...cardProps}>
      <MyStatistic {...statisticProps} />
    </MyCard>
  );
};

export default MyCardStatistic;
