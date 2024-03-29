import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import styled from '../styles/SideBar.module.css';
import { useNavigate } from 'react-router-dom';

// 아이콘 추가
import { FaGamepad } from 'react-icons/fa';
import { MdOutlineSportsBaseball, MdStarBorder } from 'react-icons/md';
import { GoGraph, GoArrowUpRight } from "react-icons/go";
import { SiBlockchaindotcom } from "react-icons/si";
import { PiTelevision } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";

const SideBar = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className={styled.sideBar}>
                <Navigation
                    onSelect={({ itemId }) => {
                        if(itemId !== ''){
                            navigate(itemId);
                        }
                    }}
                    items={[
                        {
                            title: 'Home',
                            itemId: '/',
                            elemBefore: () => <IoHomeOutline size="27" color="black" />,
                        },
                        {
                            title: 'Popular',
                            itemId: '/category/Popular',
                            elemBefore: () => <GoArrowUpRight size="27" color="black" />,
                        },
                        {
                            title: 'Gaming',
                            itemId: '/category/Gaming',
                            elemBefore: () => <FaGamepad size="27" color="black" />,
                        },
                        {
                            title: 'Sports',
                            itemId: '/category/Sports',
                            elemBefore: () => <MdOutlineSportsBaseball size="27" color="black" />,
                        },
                        {
                            title: 'Business',
                            itemId: '/category/Business',
                            elemBefore: () => <GoGraph size="27" color="black" />,
                        },
                        {
                            title: 'Crypto',
                            itemId: '/category/Crypto',
                            elemBefore: () => <SiBlockchaindotcom size="27" color="black" />,
                        },
                        {
                            title: 'Television',
                            itemId: '/category/Television',
                            elemBefore: () => <PiTelevision size="27" color="black" />,
                        },
                        {
                            title: 'Celebrity',
                            itemId: '/category/Celebrity',
                            elemBefore: () => <MdStarBorder size="27" color="black" />,
                        },
                    ]}
                />
            </div>
        </>
    );
}

export default SideBar;
