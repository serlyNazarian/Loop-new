import SidebarHelp from './SidebarHelp';
import SidebarProfile from './SidebarProfile';
import loopLogo from '../../../assets/loop-logo.svg';
import MyLink from '../../../components/myLink/MyLink';
import MyImage from '../../../components/myImage/MyImage';
import SidebarNotifications from './SidebarNotifications';
import MyFlexCenter from '../../../components/myFlex/MyFlexCenter';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import MyDividerSmall from '../../../components/myDivider/MyDividerSmall';

const SidebarFooter = ({ collapsed }) => {
  return (
    <MyFlexVertical gap={2} className="flex_shrink_0" style={{ padding: 8 }}>
      <MyDividerSmall />
      <SidebarProfile collapsed={collapsed} />
      <SidebarNotifications collapsed={collapsed} />
      <SidebarHelp collapsed={collapsed} />
      <MyFlexCenter style={{ paddingTop: 6 }}>
        <MyLink to="/dashboard">
          <MyImage src={loopLogo} alt="Loop" height={24} />
        </MyLink>
      </MyFlexCenter>
    </MyFlexVertical>
  );
};

export default SidebarFooter;
