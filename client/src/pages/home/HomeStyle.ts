//@ts-nocheck
import { makeStyles } from "@mui/styles";
import homeImage from '../../assets/images/homeImage.png';
import thirdSectionImage from '../../assets/images/thirdSection.png';
import fourthSectionBg from '../../assets/images/fourthSectionBg.png';
import { SCREEN_WIDTH } from "../../config/constants";

const screenWidth = document.documentElement.clientWidth;

export const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    firstSection: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: 'transparent',
        paddingBottom: '4rem'
    },
    imageInner: {
        backgroundImage: `url(${homeImage})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        // height: '40rem',
        display: 'flex'
    },
    imageText: {
        fontWeight: 700,
        textAlign: 'left',
        // width: '60%',
        marginTop: -10
    },
    secondSection: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        paddingBottom: '4rem',
        marginBottom: '6rem'
    },
    thirdSection: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        // backgroundColor: '#E4E9EC',
        // backgroundImage: `url(${thirdSectionImage})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        paddingBottom: '4rem',
        marginBottom: '6rem'
    },
    thirdSectionLeft: {
        // width: '65%',
        display: 'flex',
        flexDirection: 'column'
    },
    thirdSectionRight: {
        // width: '35%',
        height: 'inherit'
    },
    fourthSection: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        // backgroundColor: '#E4E9EC',
        // backgroundImage: `url(${fourthSectionBg})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        paddingBottom: '5rem',
        marginBottom: 20
    },
}))