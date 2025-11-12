import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { User } from './types';

// Import Pages
import GrammarPage from './pages/GrammarPage';
import TipsPage from './pages/TipsPage';
import Mtest from './pages/Mtest';
import TOEICPart5ByYear from './pages/TOEICPart5ByYear';
import TOEICPart6ByYear from './pages/TOEICPart6ByYear';
import TOEICPart7ByYear from './pages/TOEICPart7ByYear';
import TOEICPart7EmailReading from './pages/TOEICPart7EmailReading';
import TOEICPart7EmailList from './pages/TOEICPart7EmailList';
import TOEICPart7DoubleList from './pages/TOEICPart7DoubleList';
import TOEICPart7DoubleReading from './pages/TOEICPart7DoubleReading';
import TOEICPart7_2025_Test1 from './pages/TOEICPart7_2025_Test1';
import TOEICPart7_2025_Test2 from './pages/TOEICPart7_2025_Test2';
import TOEICPart7_2025_Test3 from './pages/TOEICPart7_2025_Test3';
import TOEICPart7_2025_Test4 from './pages/TOEICPart7_2025_Test4';
import TOEICPart7_2025_Test5 from './pages/TOEICPart7_2025_Test5';
import TOEICPart7_2025_Test6 from './pages/TOEICPart7_2025_Test6';
import TOEICPart7_2025_Test7 from './pages/TOEICPart7_2025_Test7';
import TOEICPart7_2025_Test8 from './pages/TOEICPart7_2025_Test8';
import TOEICPart7_2025_Test9 from './pages/TOEICPart7_2025_Test9';
import TOEICPart7_2025_Test10 from './pages/TOEICPart7_2025_Test10';
import TOEICPart7_2024_Test1 from './pages/TOEICPart7_2024_Test1';
import TOEICPart7_2024_Test2 from './pages/TOEICPart7_2024_Test2';
import TOEICPart7_2024_Test3 from './pages/TOEICPart7_2024_Test3';
import TOEICPart7_2024_Test4 from './pages/TOEICPart7_2024_Test4';
import TOEICPart7_2024_Test5 from './pages/TOEICPart7_2024_Test5';
import TOEICPart7_2024_Test6 from './pages/TOEICPart7_2024_Test6';
import TOEICPart7_2024_Test7 from './pages/TOEICPart7_2024_Test7';
import TOEICPart7_2024_Test8 from './pages/TOEICPart7_2024_Test8';
import TOEICPart7_2024_Test9 from './pages/TOEICPart7_2024_Test9';
import TOEICPart7_2024_Test10 from './pages/TOEICPart7_2024_Test10';
import TOEICPart7_2023_Test1 from './pages/TOEICPart7_2023_Test1';
import TOEICPart7_2023_Test2 from './pages/TOEICPart7_2023_Test2';
import TOEICPart7_2023_Test3 from './pages/TOEICPart7_2023_Test3';
import TOEICPart7_2023_Test4 from './pages/TOEICPart7_2023_Test4';
import TOEICPart7_2023_Test5 from './pages/TOEICPart7_2023_Test5';
import TOEICPart7_2023_Test6 from './pages/TOEICPart7_2023_Test6';
import TOEICPart7_2023_Test7 from './pages/TOEICPart7_2023_Test7';
import TOEICPart7_2023_Test8 from './pages/TOEICPart7_2023_Test8';
import TOEICPart7_2023_Test9 from './pages/TOEICPart7_2023_Test9';
import TOEICPart7_2023_Test10 from './pages/TOEICPart7_2023_Test10';
import TOEICPart7_2022_Test1 from './pages/TOEICPart7_2022_Test1';
import TOEICPart7_2022_Test2 from './pages/TOEICPart7_2022_Test2';
import TOEICPart7_2022_Test3 from './pages/TOEICPart7_2022_Test3';
import TOEICPart7_2022_Test4 from './pages/TOEICPart7_2022_Test4';
import TOEICPart7_2022_Test5 from './pages/TOEICPart7_2022_Test5';
import TOEICPart7_2022_Test6 from './pages/TOEICPart7_2022_Test6';
import TOEICPart7_2022_Test7 from './pages/TOEICPart7_2022_Test7';
import TOEICPart7_2022_Test8 from './pages/TOEICPart7_2022_Test8';
import TOEICPart7_2022_Test9 from './pages/TOEICPart7_2022_Test9';
import TOEICPart7_2022_Test10 from './pages/TOEICPart7_2022_Test10';
import TOEICPart7_2020_Test1 from './pages/TOEICPart7_2020_Test1';
import TOEICPart7_2020_Test2 from './pages/TOEICPart7_2020_Test2';
import TOEICPart7_2020_Test3 from './pages/TOEICPart7_2020_Test3';
import TOEICPart7_2020_Test4 from './pages/TOEICPart7_2020_Test4';
import TOEICPart7_2020_Test5 from './pages/TOEICPart7_2020_Test5';
import TOEICPart7_2020_Test6 from './pages/TOEICPart7_2020_Test6';
import TOEICPart7_2020_Test7 from './pages/TOEICPart7_2020_Test7';
import TOEICPart7_2020_Test8 from './pages/TOEICPart7_2020_Test8';
import TOEICPart7_2020_Test9 from './pages/TOEICPart7_2020_Test9';
import TOEICPart7_2020_Test10 from './pages/TOEICPart7_2020_Test10';
import TOEICPart7_2019_Test1 from './pages/TOEICPart7_2019_Test1';
import TOEICPart7_2019_Test2 from './pages/TOEICPart7_2019_Test2';
import TOEICPart7_2019_Test3 from './pages/TOEICPart7_2019_Test3';
import TOEICPart7_2019_Test4 from './pages/TOEICPart7_2019_Test4';
import TOEICPart7_2019_Test5 from './pages/TOEICPart7_2019_Test5';
import TOEICPart7_2019_Test6 from './pages/TOEICPart7_2019_Test6';
import TOEICPart7_2019_Test7 from './pages/TOEICPart7_2019_Test7';
import TOEICPart7_2019_Test8 from './pages/TOEICPart7_2019_Test8';
import TOEICPart7_2019_Test9 from './pages/TOEICPart7_2019_Test9';
import TOEICPart7_2019_Test10 from './pages/TOEICPart7_2019_Test10';
import TOEICPart7_HackerVol3_Test1 from './pages/TOEICPart7_HackerVol3_Test1';
import TOEICPart7_HackerVol3_Test2 from './pages/TOEICPart7_HackerVol3_Test2';
import TOEICPart7_HackerVol3_Test3 from './pages/TOEICPart7_HackerVol3_Test3';
import TOEICPart7_HackerVol3_Test4 from './pages/TOEICPart7_HackerVol3_Test4';
import TOEICPart7_HackerVol3_Test5 from './pages/TOEICPart7_HackerVol3_Test5';
import TOEICPart7_HackerVol3_Test6 from './pages/TOEICPart7_HackerVol3_Test6';
import TOEICPart7_HackerVol3_Test7 from './pages/TOEICPart7_HackerVol3_Test7';
import TOEICPart7_HackerVol3_Test8 from './pages/TOEICPart7_HackerVol3_Test8';
import TOEICPart7_HackerVol3_Test9 from './pages/TOEICPart7_HackerVol3_Test9';
import TOEICPart7_HackerVol3_Test10 from './pages/TOEICPart7_HackerVol3_Test10';
import TOEICPart7_YBMVol3_Test1 from './pages/TOEICPart7_YBMVol3_Test1';
import TOEICPart7_YBMVol3_Test2 from './pages/TOEICPart7_YBMVol3_Test2';
import TOEICPart7_YBMVol3_Test3 from './pages/TOEICPart7_YBMVol3_Test3';
import TOEICPart7_YBMVol3_Test4 from './pages/TOEICPart7_YBMVol3_Test4';
import TOEICPart7_YBMVol3_Test5 from './pages/TOEICPart7_YBMVol3_Test5';
import TOEICPart7_YBMVol3_Test6 from './pages/TOEICPart7_YBMVol3_Test6';
import TOEICPart7_YBMVol3_Test7 from './pages/TOEICPart7_YBMVol3_Test7';
import TOEICPart7_YBMVol3_Test8 from './pages/TOEICPart7_YBMVol3_Test8';
import TOEICPart7_YBMVol3_Test9 from './pages/TOEICPart7_YBMVol3_Test9';
import TOEICPart7_YBMVol3_Test10 from './pages/TOEICPart7_YBMVol3_Test10';
import TOEICPart7_2025_Test1_Card147_148 from './pages/TOEICPart7_2025_Test1_Card147_148';
import TOEICPart7_2025_Test1_Card149_150 from './pages/TOEICPart7_2025_Test1_Card149_150';
import TOEICPart7_2025_Test1_Card151_152 from './pages/TOEICPart7_2025_Test1_Card151_152';
import TOEICPart7_2025_Test1_Card153_154 from './pages/TOEICPart7_2025_Test1_Card153_154';
import TOEICPart7_2025_Test1_Card155_157 from './pages/TOEICPart7_2025_Test1_Card155_157';
import TOEICPart7_2025_Test1_Card158_160 from './pages/TOEICPart7_2025_Test1_Card158_160';
import TOEICPart7_2025_Test1_Card161_163 from './pages/TOEICPart7_2025_Test1_Card161_163';
import TOEICPart7_2025_Test1_Card164_167 from './pages/TOEICPart7_2025_Test1_Card164_167';
import TOEICPart7_2025_Test1_Card168_171 from './pages/TOEICPart7_2025_Test1_Card168_171';
import TOEICPart7_2025_Test1_Card172_175 from './pages/TOEICPart7_2025_Test1_Card172_175';
import TOEICPart7_2025_Test1_CardsHub from './pages/TOEICPart7_2025_Test1_CardsHub';
import TOEICPart7_2025_Test2_Card147_148 from './pages/TOEICPart7_2025_Test2_Card147_148';
import TOEICPart7_2025_Test2_Card149_150 from './pages/TOEICPart7_2025_Test2_Card149_150';
import TOEICPart7_2025_Test2_Card151_152 from './pages/TOEICPart7_2025_Test2_Card151_152';
import TOEICPart7_2025_Test2_Card153_154 from './pages/TOEICPart7_2025_Test2_Card153_154';
import TOEICPart7_2025_Test2_Card155_157 from './pages/TOEICPart7_2025_Test2_Card155_157';
import TOEICPart7_2025_Test2_Card158_160 from './pages/TOEICPart7_2025_Test2_Card158_160';
import TOEICPart7_2025_Test2_Card161_163 from './pages/TOEICPart7_2025_Test2_Card161_163';
import TOEICPart7_2025_Test1_INVO_Mini1 from './pages/TOEICPart7_2025_Test1_INVO_Mini1';
import TOEICPart7_2025_Test1_INVO_Mini2 from './pages/TOEICPart7_2025_Test1_INVO_Mini2';
import TOEICPart7_2025_Test1_INVO_Mini3 from './pages/TOEICPart7_2025_Test1_INVO_Mini3';
import TOEICPart7_2025_Test1_INVO_Mini4 from './pages/TOEICPart7_2025_Test1_INVO_Mini4';
import TOEICPart7_2025_Test1_INVO_Mini5 from './pages/TOEICPart7_2025_Test1_INVO_Mini5';
import TOEICPart7_2021_Test1 from './pages/TOEICPart7_2021_Test1';
import TOEICPart7_2021_Test2 from './pages/TOEICPart7_2021_Test2';
import TOEICPart7_2021_Test3 from './pages/TOEICPart7_2021_Test3';
import TOEICPart7_2021_Test4 from './pages/TOEICPart7_2021_Test4';
import TOEICPart7_2021_Test5 from './pages/TOEICPart7_2021_Test5';
import IELTSReadingPassage1 from './pages/IELTSReadingPassage1';
import IELTSReadingPassage1WithScoring from './pages/IELTSReadingPassage1WithScoring';
import IELTSReadingMiniScoring1 from './pages/IELTSReadingMiniScoring1';
import IELTSReadingMiniScoring2 from './pages/IELTSReadingMiniScoring2';
import IELTSReadingMiniTFNG from './pages/IELTSReadingMiniTFNG';
import IELTSReadingMiniTFNG2 from './pages/IELTSReadingMiniTFNG2';
import TOEICSentenceArrangement from './pages/TOEICSentenceArrangement';
import TOEICSentenceArrangement3 from './pages/TOEICSentenceArrangement3';
import TOEICSentenceArrangement4 from './pages/TOEICSentenceArrangement4';
import TOEICWritingTest2 from './pages/TOEICWritingTest2';
import TOEICWritingTest5 from './pages/TOEICWritingTest5';
import TOEICWritingTest6 from './pages/TOEICWritingTest6';
import TOEICWritingTest7 from './pages/TOEICWritingTest7';
import TOEICWritingTest8 from './pages/TOEICWritingTest8';
import TOEICPart5Test1 from './pages/TOEICPart5Test1';
import TOEICPart5Test1_2020 from './pages/TOEICPart5Test1_2020';
import TOEICPart5Test2_2020 from './pages/TOEICPart5Test2_2020';
import TOEICPart5Test3_2020 from './pages/TOEICPart5Test3_2020';
import TOEICPart5Test4_2020 from './pages/TOEICPart5Test4_2020';
import TOEICPart5Test5_2020 from './pages/TOEICPart5Test5_2020';
import TOEICPart5Test6_2020 from './pages/TOEICPart5Test6_2020';
import TOEICPart5Test7_2020 from './pages/TOEICPart5Test7_2020';
import TOEICPart5Test8_2020 from './pages/TOEICPart5Test8_2020';
import TOEICPart5Test9_2020 from './pages/TOEICPart5Test9_2020';
import TOEICPart5Test10_2020 from './pages/TOEICPart5Test10_2020';
import TOEICPart5Test1_2019 from './pages/TOEICPart5Test1_2019';
import TOEICPart5Test2_2019 from './pages/TOEICPart5Test2_2019';
import TOEICPart5Test3_2019 from './pages/TOEICPart5Test3_2019';
import TOEICPart5Test4_2019 from './pages/TOEICPart5Test4_2019';
import TOEICPart5Test5_2019 from './pages/TOEICPart5Test5_2019';
import TOEICPart5Test6_2019 from './pages/TOEICPart5Test6_2019';
import TOEICPart5Test7_2019 from './pages/TOEICPart5Test7_2019';
import TOEICPart5Test8_2019 from './pages/TOEICPart5Test8_2019';
import TOEICPart5Test9_2019 from './pages/TOEICPart5Test9_2019';
import TOEICPart5Test10_2019 from './pages/TOEICPart5Test10_2019';
import TOEICPart5Test1_2021 from './pages/TOEICPart5Test1_2021';
import TOEICPart5Test2_2022 from './pages/TOEICPart5Test2_2022';
import TOEICPart5Test1_2022 from './pages/TOEICPart5Test1_2022';
import TOEICPart5Test3_2022 from './pages/TOEICPart5Test3_2022';
import TOEICPart5Test4_2022 from './pages/TOEICPart5Test4_2022';
import TOEICPart5Test5_2022 from './pages/TOEICPart5Test5_2022';
import TOEICPart5Test6_2022 from './pages/TOEICPart5Test6_2022';
import TOEICPart5Test7_2022 from './pages/TOEICPart5Test7_2022';
import TOEICPart5Test8_2022 from './pages/TOEICPart5Test8_2022';
import TOEICPart5Test9_2022 from './pages/TOEICPart5Test9_2022';
import TOEICPart5Test10_2022 from './pages/TOEICPart5Test10_2022';
import TOEICPart5Test1_2023 from './pages/TOEICPart5Test1_2023';
import TOEICPart5Test2_2023 from './pages/TOEICPart5Test2_2023';
import TOEICPart5Test3_2023 from './pages/TOEICPart5Test3_2023';
import TOEICPart5Test4_2023 from './pages/TOEICPart5Test4_2023';
import TOEICPart5Test5_2023 from './pages/TOEICPart5Test5_2023';
import TOEICPart5Test6_2023 from './pages/TOEICPart5Test6_2023';
import TOEICPart5Test7_2023 from './pages/TOEICPart5Test7_2023';
import TOEICPart5Test8_2023 from './pages/TOEICPart5Test8_2023';
import TOEICPart5Test9_2023 from './pages/TOEICPart5Test9_2023';
import TOEICPart5Test10_2023 from './pages/TOEICPart5Test10_2023';
import TOEICPart5Test1_2024 from './pages/TOEICPart5Test1_2024';
import TOEICPart5Test2_2024 from './pages/TOEICPart5Test2_2024';
import TOEICPart5Test3_2024 from './pages/TOEICPart5Test3_2024';
import TOEICPart5Test4_2024 from './pages/TOEICPart5Test4_2024';
import TOEICPart5Test5_2024 from './pages/TOEICPart5Test5_2024';
import TOEICPart5Test6_2024 from './pages/TOEICPart5Test6_2024';
import TOEICPart5Test7_2024 from './pages/TOEICPart5Test7_2024';
import TOEICPart5Test8_2024 from './pages/TOEICPart5Test8_2024';
import TOEICPart5Test9_2024 from './pages/TOEICPart5Test9_2024';
import TOEICPart5Test10_2024 from './pages/TOEICPart5Test10_2024';
import TOEICPart5Test1_2025 from './pages/TOEICPart5Test1_2025';
import TOEICPart5Test2_2025 from './pages/TOEICPart5Test2_2025';
import TOEICPart5Test3_2025 from './pages/TOEICPart5Test3_2025';
import TOEICPart5Test4_2025 from './pages/TOEICPart5Test4_2025';
import TOEICPart5Test5_2025 from './pages/TOEICPart5Test5_2025';
import TOEICPart5Test6_2025 from './pages/TOEICPart5Test6_2025';
import TOEICPart5Test7_2025 from './pages/TOEICPart5Test7_2025';
import TOEICPart5Test8_2025 from './pages/TOEICPart5Test8_2025';
import TOEICPart5Test9_2025 from './pages/TOEICPart5Test9_2025';
import TOEICPart5Test10_2025 from './pages/TOEICPart5Test10_2025';
import TOEICPart5Test1_YBM_Vol2 from './pages/TOEICPart5Test1_YBM_Vol2';
import TOEICPart5Test2_YBM_Vol2 from './pages/TOEICPart5Test2_YBM_Vol2';
import TOEICPart5Test3_YBM_Vol2 from './pages/TOEICPart5Test3_YBM_Vol2';
import TOEICPart5Test4_YBM_Vol2 from './pages/TOEICPart5Test4_YBM_Vol2';
import TOEICPart5Test5_YBM_Vol2 from './pages/TOEICPart5Test5_YBM_Vol2';
import TOEICPart5Test6_YBM_Vol2 from './pages/TOEICPart5Test6_YBM_Vol2';
import TOEICPart5Test7_YBM_Vol2 from './pages/TOEICPart5Test7_YBM_Vol2';
import TOEICPart5Test8_YBM_Vol2 from './pages/TOEICPart5Test8_YBM_Vol2';
import TOEICPart5Test9_YBM_Vol2 from './pages/TOEICPart5Test9_YBM_Vol2';
import TOEICPart5Test10_YBM_Vol2 from './pages/TOEICPart5Test10_YBM_Vol2';
import TOEICPart5Test1_YBM_Vol1 from './pages/TOEICPart5Test1_YBM_Vol1';
import TOEICPart5Test2_YBM_Vol1 from './pages/TOEICPart5Test2_YBM_Vol1';
import TOEICPart5Test3_YBM_Vol1 from './pages/TOEICPart5Test3_YBM_Vol1';
import TOEICPart5Test4_YBM_Vol1 from './pages/TOEICPart5Test4_YBM_Vol1';
import TOEICPart5Test5_YBM_Vol1 from './pages/TOEICPart5Test5_YBM_Vol1';
import TOEICPart5Test6_YBM_Vol1 from './pages/TOEICPart5Test6_YBM_Vol1';
import TOEICPart5Test7_YBM_Vol1 from './pages/TOEICPart5Test7_YBM_Vol1';
import TOEICPart5Test8_YBM_Vol1 from './pages/TOEICPart5Test8_YBM_Vol1';
import TOEICPart5Test9_YBM_Vol1 from './pages/TOEICPart5Test9_YBM_Vol1';
import TOEICPart5Test10_YBM_Vol1 from './pages/TOEICPart5Test10_YBM_Vol1';
import TOEICPart5Test1_YBM_Vol3 from './pages/TOEICPart5Test1_YBM_Vol3';
import TOEICPart5Test2_YBM_Vol3 from './pages/TOEICPart5Test2_YBM_Vol3';
import TOEICPart5Test3_YBM_Vol3 from './pages/TOEICPart5Test3_YBM_Vol3';
import TOEICPart5Test4_YBM_Vol3 from './pages/TOEICPart5Test4_YBM_Vol3';
import TOEICPart5Test5_YBM_Vol3 from './pages/TOEICPart5Test5_YBM_Vol3';
import TOEICPart5Test6_YBM_Vol3 from './pages/TOEICPart5Test6_YBM_Vol3';
import TOEICPart5Test7_YBM_Vol3 from './pages/TOEICPart5Test7_YBM_Vol3';
import TOEICPart5Test8_YBM_Vol3 from './pages/TOEICPart5Test8_YBM_Vol3';
import TOEICPart5Test9_YBM_Vol3 from './pages/TOEICPart5Test9_YBM_Vol3';
import TOEICPart5Test10_YBM_Vol3 from './pages/TOEICPart5Test10_YBM_Vol3';
import TOEICPart5Test1_HACKER_Vol3 from './pages/TOEICPart5Test1_HACKER_Vol3';
import TOEICPart5Test2_HACKER_Vol3 from './pages/TOEICPart5Test2_HACKER_Vol3';
import TOEICPart5Test3_HACKER_Vol3 from './pages/TOEICPart5Test3_HACKER_Vol3';
import TOEICPart5Test4_HACKER_Vol3 from './pages/TOEICPart5Test4_HACKER_Vol3';
import TOEICPart5Test5_HACKER_Vol3 from './pages/TOEICPart5Test5_HACKER_Vol3';
import TOEICPart5Test6_HACKER_Vol3 from './pages/TOEICPart5Test6_HACKER_Vol3';
import TOEICPart5Test7_HACKER_Vol3 from './pages/TOEICPart5Test7_HACKER_Vol3';
import TOEICPart5Test8_HACKER_Vol3 from './pages/TOEICPart5Test8_HACKER_Vol3';
import TOEICPart5Test9_HACKER_Vol3 from './pages/TOEICPart5Test9_HACKER_Vol3';
import TOEICPart5Test10_HACKER_Vol3 from './pages/TOEICPart5Test10_HACKER_Vol3';
import TOEICPart5Test2 from './pages/TOEICPart5Test2';
import TOEICPart5Test2_2021 from './pages/TOEICPart5Test2_2021';
import TOEICPart5Test3 from './pages/TOEICPart5Test3';
import TOEICPart5Test3_2021 from './pages/TOEICPart5Test3_2021';
import TOEICPart5Test4 from './pages/TOEICPart5Test4';
import TOEICPart5Test4_2021 from './pages/TOEICPart5Test4_2021';
import TOEICPart5Test5 from './pages/TOEICPart5Test5';
import TOEICPart5Test5_2021 from './pages/TOEICPart5Test5_2021';
import TOEICPart5Test6 from './pages/TOEICPart5Test6';
import TOEICPart5Test7 from './pages/TOEICPart5Test7';
import TOEICPart5Test8 from './pages/TOEICPart5Test8';
import TOEICPart5Test9 from './pages/TOEICPart5Test9';
import TOEICPart5Test10 from './pages/TOEICPart5Test10';
import TOEICPart5Test11 from './pages/TOEICPart5Test11';
import TOEICPart5Test12 from './pages/TOEICPart5Test12';
import TOEICPart5Test13 from './pages/TOEICPart5Test13';
import TOEICPart5Test14 from './pages/TOEICPart5Test14';
import TOEICPart5Test15 from './pages/TOEICPart5Test15';
import KidsFlyerCambridgePart7Test1 from './pages/KidsFlyerCambridgePart7Test1';
import KidsFlyerCambridgePart7Test2 from './pages/KidsFlyerCambridgePart7Test2';
import KidsFlyerCambridgePart7Test3 from './pages/KidsFlyerCambridgePart7Test3';
import KidsFlyerCambridgePart7Test4 from './pages/KidsFlyerCambridgePart7Test4';
import KidsFlyerCambridgePart7Test5 from './pages/KidsFlyerCambridgePart7Test5';
import KidsFlyerCambridgePart7Test6 from './pages/KidsFlyerCambridgePart7Test6';
import KidsFlyerCambridgePart7Test7 from './pages/KidsFlyerCambridgePart7Test7';
import KidsFlyerCambridgePart7Test8 from './pages/KidsFlyerCambridgePart7Test8';
import KidsFlyerCambridgePart7Test9 from './pages/KidsFlyerCambridgePart7Test9';
import KidsFlyerCambridgePart7Test10 from './pages/KidsFlyerCambridgePart7Test10';
import YoungReadingStory1 from './pages/YoungReadingStory1';
import YoungReadingHub from './pages/YoungReadingHub';
import YoungWritingHub from './pages/YoungWritingHub';
import WritingHub from './pages/WritingHub';
import WritingFlashcardTrainer from './pages/WritingFlashcardTrainer';
import WritingMicroTaskArena from './pages/WritingMicroTaskArena';
import YoungWritingSentenceBuildingHub from './pages/YoungWritingSentenceBuildingHub';
import YoungGrammarHub from './pages/YoungGrammarHub';
import YoungGrammarStarter from './pages/YoungGrammarStarter';
import YoungGrammarStarter2 from './pages/YoungGrammarStarter2';
import YoungGrammarStarter3 from './pages/YoungGrammarStarter3';
import YoungGrammarStarter4 from './pages/YoungGrammarStarter4';
import YoungGrammarStarterList from './pages/YoungGrammarStarterList';
import YoungHub from './pages/YoungHub';
import IReadPage from './pages/IReadPage';
import GiaoTiepHub from './pages/GiaoTiepHub';
import GiaoTiepChaoHoi from './pages/GiaoTiepChaoHoi';
import GiaoTiepCoffeeShop from './pages/GiaoTiepCoffeeShop';
import GiaoTiepMuaSam from './pages/GiaoTiepMuaSam';
import GiaoTiepCan from './pages/GiaoTiepCan';
import GiaoTiepNhaHang from './pages/GiaoTiepNhaHang';
import GiaoTiepDuLich from './pages/GiaoTiepDuLich';
import GiaoTiepCongViec from './pages/GiaoTiepCongViec';
import GiaoTiepYTe from './pages/GiaoTiepYTe';
import GiaoTiepGiaoDuc from './pages/GiaoTiepGiaoDuc';
import GiaoTiepGiaDinh from './pages/GiaoTiepGiaDinh';
import GiaoTiepSanBay from './pages/GiaoTiepSanBay';
import GiaoTiepSieuThi from './pages/GiaoTiepSieuThi';
import GiaoTiepGoVapMarket from './pages/GiaoTiepGoVapMarket';
import GiaoTiepCGV from './pages/GiaoTiepCGV';
import GiaoTiepQuanLau from './pages/GiaoTiepQuanLau';
import GiaoTiepHieuThuoc from './pages/GiaoTiepHieuThuoc';
import GiaoTiepSuaXeMay from './pages/GiaoTiepSuaXeMay';
import GiaoTiepCuaHangDienThoai from './pages/GiaoTiepCuaHangDienThoai';
import GiaoTiepCuaHangHoa from './pages/GiaoTiepCuaHangHoa';
import GiaoTiepCuaHangSach from './pages/GiaoTiepCuaHangSach';
import GiaoTiepMoiDamCuoi from './pages/GiaoTiepMoiDamCuoi';
import GiaoTiepCuaHangThuCung from './pages/GiaoTiepCuaHangThuCung';
import GiaoTiepCuaHangTraiCay from './pages/GiaoTiepCuaHangTraiCay';
import GiaoTiepMoiSinhNhat from './pages/GiaoTiepMoiSinhNhat';
import GiaoTiepTiemCatToc from './pages/GiaoTiepTiemCatToc';
import GiaoTiepDuLichAmerica from './pages/GiaoTiepDuLichAmerica';
import GiaoTiepDuLichDaLat from './pages/GiaoTiepDuLichDaLat';
import GiaoTiepDuLichDanang from './pages/GiaoTiepDuLichDanang';
import GiaoTiepDuLichHalongBay from './pages/GiaoTiepDuLichHalongBay';
import GiaoTiepDuLichHanQuoc from './pages/GiaoTiepDuLichHanQuoc';
import GiaoTiepDuLichNhatBan from './pages/GiaoTiepDuLichNhatBan';
import GiaoTiepDuLichSingapore from './pages/GiaoTiepDuLichSingapore';
import GiaoTiepDuLichVungTau from './pages/GiaoTiepDuLichVungTau';
import YoungGrammarStarterLesson7 from './pages/YoungGrammarStarterLesson7';
import YoungGrammarStarterLesson1 from './pages/YoungGrammarStarterLesson1';
import YoungGrammarStarterLesson3 from './pages/YoungGrammarStarterLesson3';
import YoungGrammarStarterLesson5 from './pages/YoungGrammarStarterLesson5';
import YoungGrammarStarterLesson6 from './pages/YoungGrammarStarterLesson6';
import YoungGrammarStarterLesson28 from './pages/YoungGrammarStarterLesson28';
import YoungGrammarStarterLesson6Review from './pages/YoungGrammarStarterLesson6Review';
import YoungGrammarStarterLesson5ThereIsAre from './pages/YoungGrammarStarterLesson5ThereIsAre';
import YoungGrammarStarterLesson4CanCant from './pages/YoungGrammarStarterLesson4CanCant';
import YoungGrammarStarterLesson3Comparative from './pages/YoungGrammarStarterLesson3Comparative';
import YoungGrammarStarterLesson2Plural from './pages/YoungGrammarStarterLesson2Plural';
import YoungGrammarStarterReview from './pages/YoungGrammarStarterReview';
import YoungGrammarMoverList from './pages/YoungGrammarMoverList';
import YoungGrammarMoverLesson1 from './pages/YoungGrammarMoverLesson1';
import YoungGrammarMoverLesson2 from './pages/YoungGrammarMoverLesson2';
import YoungGrammarMoverLesson3 from './pages/YoungGrammarMoverLesson3';
import YoungGrammarMoverLesson4 from './pages/YoungGrammarMoverLesson4';
import YoungGrammarMoverLesson5 from './pages/YoungGrammarMoverLesson5';
import YoungGrammarMoverLesson6 from './pages/YoungGrammarMoverLesson6';
import YoungGrammarMoverLesson7 from './pages/YoungGrammarMoverLesson7';
import YoungGrammarMoverLesson8 from './pages/YoungGrammarMoverLesson8';
import YoungGrammarMoverLesson9 from './pages/YoungGrammarMoverLesson9';
import YoungGrammarMoverLesson10 from './pages/YoungGrammarMoverLesson10';
import YoungGrammarMoverLesson11 from './pages/YoungGrammarMoverLesson11';
import YoungGrammarMoverLesson12 from './pages/YoungGrammarMoverLesson12';
import YoungGrammarMoverLesson13 from './pages/YoungGrammarMoverLesson13';
import YoungGrammarMoverLesson14 from './pages/YoungGrammarMoverLesson14';
import YoungGrammarMoverLesson15 from './pages/YoungGrammarMoverLesson15';
import YoungGrammarMoverLesson16 from './pages/YoungGrammarMoverLesson16';
import YoungGrammarMoverLesson17 from './pages/YoungGrammarMoverLesson17';
import YoungGrammarMoverLesson18 from './pages/YoungGrammarMoverLesson18';
import YoungGrammarMoverLesson19 from './pages/YoungGrammarMoverLesson19';
import YoungGrammarMoverLesson20 from './pages/YoungGrammarMoverLesson20';
import YoungGrammarFlyerList from './pages/YoungGrammarFlyerList';
import YoungGrammarFlyerLesson1 from './pages/YoungGrammarFlyerLesson1';
import YoungGrammarFlyerLesson2 from './pages/YoungGrammarFlyerLesson2';
import YoungGrammarFlyerLesson3 from './pages/YoungGrammarFlyerLesson3';
import YoungGrammarFlyerLesson4 from './pages/YoungGrammarFlyerLesson4';
import YoungGrammarFlyerLesson5 from './pages/YoungGrammarFlyerLesson5';
import YoungGrammarFlyerLesson6 from './pages/YoungGrammarFlyerLesson6';
import YoungGrammarFlyerLesson7 from './pages/YoungGrammarFlyerLesson7';
import YoungGrammarFlyerLesson8 from './pages/YoungGrammarFlyerLesson8';
import YoungGrammarFlyerLesson9 from './pages/YoungGrammarFlyerLesson9';
import YoungGrammarFlyerLesson10 from './pages/YoungGrammarFlyerLesson10';
import YoungGrammarFlyerLesson11 from './pages/YoungGrammarFlyerLesson11';
import YoungGrammarFlyerLesson12 from './pages/YoungGrammarFlyerLesson12';
import YoungGrammarFlyerLesson13 from './pages/YoungGrammarFlyerLesson13';
import YoungGrammarFlyerLesson14 from './pages/YoungGrammarFlyerLesson14';
import YoungGrammarFlyerLesson15 from './pages/YoungGrammarFlyerLesson15';
import YoungGrammarFlyerLesson16 from './pages/YoungGrammarFlyerLesson16';
import YoungGrammarFlyerLesson17 from './pages/YoungGrammarFlyerLesson17';
import YoungGrammarFlyerLesson18 from './pages/YoungGrammarFlyerLesson18';
import YoungGrammarFlyerLesson19 from './pages/YoungGrammarFlyerLesson19';
import YoungGrammarFlyerLesson20 from './pages/YoungGrammarFlyerLesson20';
import YoungGrammarFlyerLesson21 from './pages/YoungGrammarFlyerLesson21';
import YoungGrammarFlyerLesson22 from './pages/YoungGrammarFlyerLesson22';
import YoungGrammarFlyerLesson23 from './pages/YoungGrammarFlyerLesson23';
import YoungGrammarFlyerLesson24 from './pages/YoungGrammarFlyerLesson24';
import YoungGrammarFlyerLesson25 from './pages/YoungGrammarFlyerLesson25';
import GiaoTiepCuaHangDienMay from './pages/GiaoTiepCuaHangDienMay';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';
import CambridgePracticePage from './pages/CambridgePracticePage';
import BananaAchievements from './pages/BananaAchievements';
import ProfilePage from './pages/ProfilePage'; // NEW: Profile Page

// Protected Route Component for Admin
// 🔒 SECURITY: Enhanced admin route protection with logging
const ProtectedRoute: React.FC<{ children: React.ReactNode; requiredRole?: string }> = ({ children, requiredRole = 'Admin' }) => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        if (!currentUser || currentUser.role !== requiredRole) {
            // 🔒 SECURITY: Log unauthorized access attempts
            console.warn('⚠️ [SECURITY] Unauthorized access attempt to admin route:', {
                userId: currentUser?.id,
                userRole: currentUser?.role,
                requiredRole,
                path: location.pathname,
                timestamp: new Date().toISOString()
            });
            
            // 🔒 SECURITY: Log to server (optional - can be added to backend)
            try {
                fetch('/api/admin-access-log', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId: currentUser?.id,
                        userRole: currentUser?.role,
                        requiredRole,
                        action: 'unauthorized_access_attempt',
                        path: location.pathname,
                        timestamp: new Date().toISOString()
                    })
                }).catch(() => {}); // Silent fail - don't block redirect
            } catch (e) {
                // Silent fail
            }
            
            navigate('/grammar', { replace: true });
        } else {
            // 🔒 SECURITY: Log successful admin access
            console.log('✅ [SECURITY] Admin access granted:', {
                userId: currentUser.id,
                userRole: currentUser.role,
                path: location.pathname,
                timestamp: new Date().toISOString()
            });
        }
    }, [currentUser, requiredRole, navigate, location.pathname]);
    
    if (!currentUser || currentUser.role !== requiredRole) {
        return null; // Don't render anything while redirecting
    }
    
    return <>{children}</>;
};

// Protected Route Component for Test Hub (requires login)
const ProtectedTestHubRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { currentUser } = useAuth();
    const location = useLocation();
    
    if (!currentUser) {
        // Redirect to login with return URL
        return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`} replace />;
    }
    
    return <>{children}</>;
};

import AddBananasPage from './pages/AddBananasPage'; // NEW: Add Bananas Page
import FilesBrowserPage from './pages/FilesBrowserPage'; // NEW: Files Browser Page
import VocaHubNew from './pages/VocaHubNew';
import IELTSWritingTask1Vocabulary from './pages/IELTSWritingTask1Vocabulary';
import IELTSWritingTask2Vocabulary from './pages/IELTSWritingTask2Vocabulary';
import VSTEPWritingTask1Vocabulary from './pages/VSTEPWritingTask1Vocabulary';
import VSTEPWritingTask2Vocabulary from './pages/VSTEPWritingTask2Vocabulary';
import TOEICWritingTask1Vocabulary from './pages/TOEICWritingTask1Vocabulary';
import TOEICWritingTask2Vocabulary from './pages/TOEICWritingTask2Vocabulary';
import TOEICWritingTask3Vocabulary from './pages/TOEICWritingTask3Vocabulary'; // NEW: Modern Voca Hub
import YoungVoca from './pages/YoungVoca'; // NEW: Young Voca
import KidSentenceBuildingSelection from './pages/KidSentenceBuildingSelection'; // NEW: Kid Sentence Building Selection
import KidSentenceBuilding from './pages/KidSentenceBuilding'; // NEW: Kid Sentence Building
import SpeakingHubNew from './pages/SpeakingHubNew'; // NEW: Modern Speaking Hub
import IELTSSpeaking from './pages/IELTSSpeaking'; // NEW: IELTS Speaking
import IELTSSpeakingPart1 from './pages/IELTSSpeakingPart1'; // NEW: IELTS Speaking Part 1
import IELTSSpeakingPart1Enhanced from './pages/IELTSSpeakingPart1Enhanced'; // NEW: IELTS Speaking Part 1 Enhanced
import IELTSSpeakingPart1GoodService from './pages/IELTSSpeakingPart1GoodService'; // NEW: IELTS Speaking Part 1 - Good Service
import TestTopics from './pages/TestTopics'; // NEW: Test Topics Debug
import SimpleTest from './pages/SimpleTest'; // NEW: Simple Test
import IELTSSpeakingPart2 from './pages/IELTSSpeakingPart2'; // NEW: IELTS Speaking Part 2
import IELTSSpeakingPart3 from './pages/IELTSSpeakingPart3'; // NEW: IELTS Speaking Part 3
import TOEICSpeaking from './pages/TOEICSpeaking'; // NEW: TOEIC Speaking
import TOEICSpeakingQuestions1_2 from './pages/TOEICSpeakingQuestions1-2'; // NEW: TOEIC Speaking Questions 1-2
import TOEICSpeakingQuestions3_4 from './pages/TOEICSpeakingQuestions3-4'; // NEW: TOEIC Speaking Questions 3-4
import TOEICSpeakingQuestions5_7 from './pages/TOEICSpeakingQuestions5-7'; // NEW: TOEIC Speaking Questions 5-7
import TOEICSpeakingQuestions8_10 from './pages/TOEICSpeakingQuestions8-10'; // NEW: TOEIC Speaking Questions 8-10
import TOEICSpeakingQuestion11 from './pages/TOEICSpeakingQuestion11'; // NEW: TOEIC Speaking Question 11
import TOEICSpeakingFullTest1 from './pages/TOEICSpeakingFullTest1'; // NEW: TOEIC Speaking Full Test 1
import TOEICSpeakingFullTest2 from './pages/TOEICSpeakingFullTest2'; // NEW: TOEIC Speaking Full Test 2
import TOEICSpeakingFullTest3 from './pages/TOEICSpeakingFullTest3'; // NEW: TOEIC Speaking Full Test 3
import TOEICSpeakingFullTest4 from './pages/TOEICSpeakingFullTest4'; // NEW: TOEIC Speaking Full Test 4
import TOEICSpeakingFullTest5 from './pages/TOEICSpeakingFullTest5'; // NEW: TOEIC Speaking Full Test 5
import TOEICSpeakingFullTest6 from './pages/TOEICSpeakingFullTest6'; // NEW: TOEIC Speaking Full Test 6
import TOEICSpeakingFullTest7 from './pages/TOEICSpeakingFullTest7'; // NEW: TOEIC Speaking Full Test 7
import TOEICSpeakingFullTest8 from './pages/TOEICSpeakingFullTest8'; // NEW: TOEIC Speaking Full Test 8
import TOEICSpeakingFullTest9 from './pages/TOEICSpeakingFullTest9'; // NEW: TOEIC Speaking Full Test 9
import TOEICSpeakingFullTest10 from './pages/TOEICSpeakingFullTest10'; // NEW: TOEIC Speaking Full Test 10
import TOEICWritingFullTest1 from './pages/TOEICWritingFullTest1'; // NEW: TOEIC Writing Full Test 1
import TOEICWritingFullTest2 from './pages/TOEICWritingFullTest2'; // NEW: TOEIC Writing Full Test 2
import TOEICWritingFullTest3 from './pages/TOEICWritingFullTest3'; // NEW: TOEIC Writing Full Test 3
import TOEICWritingFullTest4 from './pages/TOEICWritingFullTest4'; // NEW: TOEIC Writing Full Test 4
import TOEICWritingFullTest5 from './pages/TOEICWritingFullTest5'; // NEW: TOEIC Writing Full Test 5
import TOEICWritingFullTest6 from './pages/TOEICWritingFullTest6'; // NEW: TOEIC Writing Full Test 6
import TOEICWritingFullTest8 from './pages/TOEICWritingFullTest8'; // NEW: TOEIC Writing Full Test 8
import TOEICWritingFullTest9 from './pages/TOEICWritingFullTest9'; // NEW: TOEIC Writing Full Test 9
import VSTEPSpeaking from './pages/VSTEPSpeaking'; // NEW: VSTEP Speaking
import VSTEPSpeakingPart1 from './pages/VSTEPSpeakingPart1'; // NEW: VSTEP Speaking Part 1
import VSTEPSpeakingPart2 from './pages/VSTEPSpeakingPart2'; // NEW: VSTEP Speaking Part 2
import VSTEPSpeakingPart3 from './pages/VSTEPSpeakingPart3'; // NEW: VSTEP Speaking Part 3
import VSTEPReadingMainIdeaHub from './pages/VSTEPReadingMainIdeaHub';
import VSTEPReadingMainIdeaTest1 from './pages/VSTEPReadingMainIdeaTest1';
import VSTEPReadingMainIdeaTest2 from './pages/VSTEPReadingMainIdeaTest2';
import VSTEPReadingMainIdeaTest3 from './pages/VSTEPReadingMainIdeaTest3';
import VSTEPReadingMainIdeaTest4 from './pages/VSTEPReadingMainIdeaTest4';
import VSTEPReadingMainIdeaTest5 from './pages/VSTEPReadingMainIdeaTest5';
import VSTEPReadingMainIdeaTest6 from './pages/VSTEPReadingMainIdeaTest6';
import VSTEPReadingVocabulary from './pages/VSTEPReadingVocabulary';
import VSTEPReadingVocabularyTest1 from './pages/VSTEPReadingVocabularyTest1';
import VSTEPReadingVocabularyTest2 from './pages/VSTEPReadingVocabularyTest2';
import VSTEPReadingVocabularyTest3 from './pages/VSTEPReadingVocabularyTest3';
import VSTEPReadingVocabularyTest4 from './pages/VSTEPReadingVocabularyTest4';
import VSTEPReadingVocabularyTest5 from './pages/VSTEPReadingVocabularyTest5';
import VSTEPReadingVocabularyTest6 from './pages/VSTEPReadingVocabularyTest6';
import VSTEPReadingVocabularyTest7 from './pages/VSTEPReadingVocabularyTest7';
import VSTEPReadingVocabularyTest8 from './pages/VSTEPReadingVocabularyTest8';
import VSTEPReadingVocabularyTest9 from './pages/VSTEPReadingVocabularyTest9';
import VSTEPReadingVocabularyTest11 from './pages/VSTEPReadingVocabularyTest11';
import VSTEPReadingVocabularyTest12 from './pages/VSTEPReadingVocabularyTest12';
import VSTEPReadingDetail from './pages/VSTEPReadingDetail';
import VSTEPReadingInference from './pages/VSTEPReadingInference';
import VSTEPReadingSynthesis from './pages/VSTEPReadingSynthesis';
import VSTEPReadingOther from './pages/VSTEPReadingOther';
import IELTSWritingTask1 from './pages/IELTSWritingTask1';
import IELTSWritingTask2 from './pages/IELTSWritingTask2';
import VSTEPWritingTask1 from './pages/VSTEPWritingTask1';
import VSTEPWritingTask2 from './pages/VSTEPWritingTask2';
import TOEICWritingTask1 from './pages/TOEICWritingTask1';
import TOEICWritingTask2 from './pages/TOEICWritingTask2';
import TOEICWritingTask3 from './pages/TOEICWritingTask3';
import TestHubBasicAAnPlurals from './pages/TestHubBasicAAnPlurals';
import TestHubBasicSoSuch from './pages/TestHubBasicSoSuch';
import TestHubBasicQuestionWords from './pages/TestHubBasicQuestionWords';
import TestHubBasicAdvancedGrammar from './pages/TestHubBasicAdvancedGrammar';
import GrammarLessonsHub from './pages/GrammarLessonsHub';
import GrammarLesson from './pages/GrammarLesson';

// Auth Context moved out to break circular imports
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ScoreAnimationProvider } from './contexts/ScoreAnimationContext';
// Re-export to maintain backward compatibility for modules importing from '../App'
export { useAuth } from './contexts/AuthContext';
export { useScoreAnimation } from './contexts/ScoreAnimationContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppLayout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const fullWidthPages = ['/grammar', '/tips', '/mtest', '/toeic-part7-email-reading', '/toeic-part7-email-list', '/toeic-part7-double-reading', '/toeic-part7-double-list', '/toeic-part7-by-year', '/toeic-part7-2025-test-1', '/toeic-part7-2025-test-2', '/toeic-part7-2025-test-3', '/toeic-part7-2025-test-4', '/toeic-part7-2025-test-5', '/toeic-part7-2025-test-6', '/toeic-part7-2025-test-7', '/toeic-part7-2025-test-8', '/toeic-part7-2025-test-9', '/toeic-part7-2025-test-10', '/toeic-part7-2024-test-1', '/toeic-part7-2024-test-2', '/toeic-part7-2024-test-3', '/toeic-part7-2024-test-4', '/toeic-part7-2024-test-5', '/toeic-part7-2024-test-6', '/toeic-part7-2024-test-7', '/toeic-part7-2024-test-8', '/toeic-part7-2024-test-9', '/toeic-part7-2024-test-10', '/toeic-part7-2023-test-1', '/toeic-part7-2023-test-2', '/toeic-part7-2023-test-3', '/toeic-part7-2023-test-4', '/toeic-part7-2023-test-5', '/toeic-part7-2023-test-6', '/toeic-part7-2023-test-7', '/toeic-part7-2023-test-8', '/toeic-part7-2023-test-9', '/toeic-part7-2023-test-10', '/toeic-part7-2022-test-1', '/toeic-part7-2022-test-2', '/toeic-part7-2022-test-3', '/toeic-part7-2022-test-4', '/toeic-part7-2022-test-5', '/toeic-part7-2022-test-6', '/toeic-part7-2022-test-7', '/toeic-part7-2022-test-8', '/toeic-part7-2022-test-9', '/toeic-part7-2022-test-10', '/toeic-part7-2020-test-1', '/toeic-part7-2020-test-2', '/toeic-part7-2020-test-3', '/toeic-part7-2020-test-4', '/toeic-part7-2020-test-5', '/toeic-part7-2020-test-6', '/toeic-part7-2020-test-7', '/toeic-part7-2020-test-8', '/toeic-part7-2020-test-9', '/toeic-part7-2020-test-10', '/toeic-part7-2019-test-1', '/toeic-part7-2019-test-2', '/toeic-part7-2019-test-3', '/toeic-part7-2019-test-4', '/toeic-part7-2019-test-5', '/toeic-part7-2019-test-6', '/toeic-part7-2019-test-7', '/toeic-part7-2019-test-8', '/toeic-part7-2019-test-9', '/toeic-part7-2019-test-10', '/toeic-part7-hacker-vol3-test-1', '/toeic-part7-hacker-vol3-test-2', '/toeic-part7-hacker-vol3-test-3', '/toeic-part7-hacker-vol3-test-4', '/toeic-part7-hacker-vol3-test-5', '/toeic-part7-hacker-vol3-test-6', '/toeic-part7-hacker-vol3-test-7', '/toeic-part7-hacker-vol3-test-8', '/toeic-part7-hacker-vol3-test-9', '/toeic-part7-hacker-vol3-test-10', '/toeic-part7-ybm-vol3-test-1', '/toeic-part7-ybm-vol3-test-2', '/toeic-part7-ybm-vol3-test-3', '/toeic-part7-ybm-vol3-test-4', '/toeic-part7-ybm-vol3-test-5', '/toeic-part7-ybm-vol3-test-6', '/toeic-part7-ybm-vol3-test-7', '/toeic-part7-ybm-vol3-test-8', '/toeic-part7-ybm-vol3-test-9', '/toeic-part7-ybm-vol3-test-10', '/vstep-reading-main-idea', '/vstep-reading-main-idea-test1', '/vstep-reading-main-idea-test2', '/vstep-reading-main-idea-test3', '/vstep-reading-main-idea-test4', '/vstep-reading-main-idea-test5', '/vstep-reading-main-idea-test6', '/vstep-reading-vocabulary', '/vstep-reading-vocabulary-test1', '/vstep-reading-detail', '/vstep-reading-inference', '/vstep-reading-synthesis', '/vstep-reading-other', '/toeic-part7-2025-test1-cards', '/toeic-part7-2025-test1-card147-148', '/toeic-part7-2025-test1-card149-150', '/toeic-part7-2025-test1-card151-152', '/toeic-part7-2025-test1-card153-154', '/toeic-part7-2025-test1-card155-157', '/toeic-part7-2025-test1-card158-160', '/toeic-part7-2025-test1-card161-163', '/toeic-part7-2025-test1-card164-167', '/toeic-part7-2025-test1-card168-171', '/toeic-part7-2025-test1-card172-175', '/toeic-part7-2025-test2-card147-148', '/toeic-part7-2025-test2-card149-150', '/toeic-part7-2025-test1-card155-156', '/toeic-part7-2025-test1-card157-158', '/toeic-part7-2025-test1-card159-160', '/toeic-part7-2025-test1-card161-162', '/toeic-part7-2025-test1-card163-164', '/toeic-part7-2025-test1-card165-166', '/toeic-part7-2025-test1-card167-168', '/toeic-part7-2025-test1-card169-170', '/toeic-part7-2025-test1-card171-172', '/toeic-part7-2025-test1-card173-174', '/toeic-part7-2025-test1-card175-176', '/toeic-part7-2025-test1-invo-mini1', '/toeic-part7-2025-test1-invo-mini2', '/toeic-part7-2025-test1-invo-mini3', '/toeic-part7-2025-test1-invo-mini4', '/toeic-part7-2025-test1-invo-mini5', '/toeic-part7-2021-test-1', '/toeic-part7-2021-test-2', '/toeic-part7-2021-test-3', '/toeic-part7-2021-test-4', '/toeic-part7-2021-test-5', '/toeic-sentence-arrangement', '/toeic-sentence-arrangement-3', '/toeic-sentence-arrangement-4', '/toeic-writing-test-2', '/toeic-writing-test-5', '/toeic-writing-test-6', '/toeic-writing-test-7', '/toeic-writing-test-8', '/toeic-part5-test-1', '/toeic-part5-test-1-2019', '/toeic-part5-test-2-2019', '/toeic-part5-test-3-2019', '/toeic-part5-test-4-2019', '/toeic-part5-test-5-2019', '/toeic-part5-test-6-2019', '/toeic-part5-test-7-2019', '/toeic-part5-test-8-2019', '/toeic-part5-test-9-2019', '/toeic-part5-test-10-2019', '/toeic-part5-test-1-2020', '/toeic-part5-test-2-2020', '/toeic-part5-test-3-2020', '/toeic-part5-test-4-2020', '/toeic-part5-test-5-2020', '/toeic-part5-test-6-2020', '/toeic-part5-test-7-2020', '/toeic-part5-test-8-2020', '/toeic-part5-test-9-2020', '/toeic-part5-test-10-2020', '/toeic-part5-test-1-2021', '/toeic-part5-test-2', '/toeic-part5-test-2-2021', '/toeic-part5-test-3-2021', '/toeic-part5-test-4-2021', '/toeic-part5-test-5-2021', '/toeic-part5-test-3', '/toeic-part5-test-4', '/toeic-part5-test-5', '/toeic-part5-test-6', '/toeic-part5-test-7', '/toeic-part5-test-8', '/toeic-part5-test-9', '/toeic-part5-test-10', '/toeic-part5-test-11', '/toeic-part5-test-12', '/toeic-part5-test-13', '/toeic-part5-test-14', '/toeic-part5-test-15', '/kids-flyer-cambridge-part7-test1', '/kids-flyer-cambridge-part7-test2', '/kids-flyer-cambridge-part7-test3', '/kids-flyer-cambridge-part7-test4', '/kids-flyer-cambridge-part7-test5', '/kids-flyer-cambridge-part7-test6', '/kids-flyer-cambridge-part7-test7', '/kids-flyer-cambridge-part7-test8', '/kids-flyer-cambridge-part7-test9', '/kids-flyer-cambridge-part7-test10', '/young-reading-story1', '/young-reading-hub', '/young-writing-hub', '/young-writing-sentence-building', '/young-grammar-hub', '/young-grammar-starter', '/young-grammar-starter-lesson-1', '/young-grammar-starter-lesson-2', '/young-grammar-starter-lesson-3', '/young-grammar-starter-lesson-4', '/young-grammar-starter-lesson-5', '/young-grammar-starter-lesson-6', '/young-grammar-starter-lesson-7', '/young-grammar-starter-lesson-28', '/young-grammar-starter-lesson-6-review', '/young-grammar-starter-lesson-5-there-is-are', '/young-grammar-starter-lesson-4-can-cant', '/young-grammar-starter-lesson-3-comparative', '/young-grammar-starter-lesson-2-plural', '/young-grammar-starter-review', '/young-grammar-mover', '/young-grammar-mover-lesson-1', '/young-grammar-mover-lesson-2', '/young-grammar-mover-lesson-3', '/young-grammar-mover-lesson-4', '/young-grammar-mover-lesson-5', '/young-grammar-mover-lesson-6', '/young-grammar-mover-lesson-7', '/young-grammar-mover-lesson-8', '/young-grammar-mover-lesson-9', '/young-grammar-mover-lesson-10', '/young-grammar-mover-lesson-11', '/young-grammar-mover-lesson-12', '/young-grammar-mover-lesson-13', '/young-grammar-mover-lesson-14', '/young-grammar-mover-lesson-15', '/young-grammar-mover-lesson-16', '/young-grammar-mover-lesson-17', '/young-grammar-mover-lesson-18', '/young-grammar-mover-lesson-19', '/young-grammar-mover-lesson-20', '/young-grammar-flyer', '/young-grammar-flyer-lesson-1', '/young-grammar-flyer-lesson-2', '/young-grammar-flyer-lesson-3', '/young-grammar-flyer-lesson-4', '/young-grammar-flyer-lesson-5', '/young-grammar-flyer-lesson-6', '/young-grammar-flyer-lesson-7', '/young-grammar-flyer-lesson-8', '/young-grammar-flyer-lesson-9', '/young-grammar-flyer-lesson-10', '/young-grammar-flyer-lesson-11', '/young-grammar-flyer-lesson-12', '/young-grammar-flyer-lesson-13', '/young-grammar-flyer-lesson-14', '/young-grammar-flyer-lesson-15', '/young-grammar-flyer-lesson-16', '/young-grammar-flyer-lesson-17', '/young-grammar-flyer-lesson-18', '/young-grammar-flyer-lesson-19', '/young-grammar-flyer-lesson-20', '/young-grammar-flyer-lesson-21', '/young-grammar-flyer-lesson-22', '/young-grammar-flyer-lesson-23', '/young-grammar-flyer-lesson-24', '/young-grammar-flyer-lesson-25', '/young-hub', '/iread', '/giao-tiep', '/giao-tiep-chao-hoi', '/giao-tiep-coffee-shop', '/giao-tiep-mua-sam', '/giao-tiep-nha-hang', '/giao-tiep-du-lich', '/giao-tiep-cong-viec', '/giao-tiep-y-te', '/giao-tiep-giao-duc', '/giao-tiep-gia-dinh', '/giao-tiep-san-bay', '/giao-tiep-sieu-thi', '/giao-tiep-cho-go-vap', '/giao-tiep-cgv', '/giao-tiep-quan-lau', '/giao-tiep-hieu-thuoc', '/giao-tiep-sua-xe-may', '/giao-tiep-cua-hang-dien-thoai', '/giao-tiep-cua-hang-hoa', '/giao-tiep-cua-hang-sach', '/giao-tiep-cua-hang-dien-may', '/cambridge-practice', '/admin', '/add-bananas', '/files', '/ielts-writing-task1', '/ielts-writing-task2', '/voca-hub', '/ielts-writing-task1-vocabulary', '/ielts-writing-task2-vocabulary', '/vstep-writing-task1-vocabulary', '/vstep-writing-task2-vocabulary', '/toeic-writing-task1-vocabulary', '/toeic-writing-task2-vocabulary', '/toeic-writing-task3-vocabulary', '/speaking-hub', '/ielts-speaking', '/ielts-speaking-part1', '/ielts-speaking-part1-enhanced', '/ielts-speaking-part2', '/ielts-speaking-part3', '/toeic-speaking', '/toeic-speaking-questions1-2', '/toeic-speaking-questions3-4', '/toeic-speaking-questions5-7', '/toeic-speaking-questions8-10', '/toeic-speaking-question11', '/vstep-speaking', '/vstep-speaking-part1', '/vstep-speaking-part2', '/vstep-speaking-part3', '/writing-hub', '/writing-flashcards', '/writing-microtasks', '/ielts-reading-mini-tfng', '/ielts-reading-mini-tfng-2', '/ielts-reading-mini-scoring-1', '/ielts-reading-mini-scoring-2'];
    const isFullWidthPage = fullWidthPages.some(path => location.pathname.startsWith(path));

    const mainClasses = `${isFullWidthPage ? "w-full" : "container"} ${isFullWidthPage ? "" : "mx-auto px-4 sm:px-6 lg:px-8"} pb-12`;

    return (
        <>
            <ScrollToTop />
            <Header />
            {/* Global Back Bar for all TOEIC Part 5 test pages */}
            {location.pathname.startsWith('/toeic-part5-test') && (
                <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
                    <div className={`${isFullWidthPage ? "w-full" : "container mx-auto px-4 sm:px-6 lg:px-8"} py-2`}>
                        <button
                            onClick={() => navigate('/toeic-part5-by-year')}
                            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                            <span>←</span>
                            <span>TOEIC Part 5 Tests by Year</span>
                        </button>
                    </div>
                </div>
            )}
            {/* Global Back Bar for all TOEIC Part 7 test pages */}
            {(location.pathname.startsWith('/toeic-part7-2025-test') || location.pathname.startsWith('/toeic-part7-2025-test1-card') || location.pathname.startsWith('/toeic-part7-2021-test') || location.pathname.startsWith('/toeic-part7-2020-test') || location.pathname.startsWith('/toeic-part7-2019-test') || location.pathname.startsWith('/toeic-part7-hacker-vol3-test') || location.pathname.startsWith('/toeic-part7-ybm-vol3-test')) && (
              <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
                <div className={`${isFullWidthPage ? "w-full" : "container mx-auto px-4 sm:px-6 lg:px-8"} py-2`}>
                  <button
                    onClick={() => navigate('/toeic-part7-by-year')}
                    className="inline-flex items-center gap-2 text-sm font-medium text-rose-600 hover:text-rose-700"
                  >
                    <span>←</span>
                    <span>TOEIC Part 7 Tests by Year</span>
                  </button>
                </div>
              </div>
            )}
            <main className={mainClasses}>
                <Routes>
                    <Route path="/" element={<Navigate to="/grammar" replace />} />
                    <Route path="/grammar" element={<GrammarPage />} />
                    <Route path="/tips" element={<TipsPage />} />
                    <Route path="/mtest" element={<ProtectedTestHubRoute><Mtest /></ProtectedTestHubRoute>} />
                    <Route path="/toeic-part5-by-year" element={<TOEICPart5ByYear />} />
                    <Route path="/toeic-part6-by-year" element={<TOEICPart6ByYear />} />
                    <Route path="/toeic-part7-by-year" element={<TOEICPart7ByYear />} />
                    <Route path="/toeic-part7-email-list" element={<TOEICPart7EmailList />} />
                    <Route path="/toeic-part7-double-list" element={<TOEICPart7DoubleList />} />
                    <Route path="/toeic-part7-email-reading/:emailId" element={<TOEICPart7EmailReading />} />
                    <Route path="/toeic-part7-double-reading/:passageId" element={<TOEICPart7DoubleReading />} />
                    <Route path="/toeic-part7-2025-test-1" element={<TOEICPart7_2025_Test1 />} />
                    <Route path="/toeic-part7-2025-test-2" element={<TOEICPart7_2025_Test2 />} />
                    <Route path="/toeic-part7-2025-test-3" element={<TOEICPart7_2025_Test3 />} />
                    <Route path="/toeic-part7-2025-test-4" element={<TOEICPart7_2025_Test4 />} />
                    <Route path="/toeic-part7-2025-test-5" element={<TOEICPart7_2025_Test5 />} />
                    <Route path="/toeic-part7-2025-test-6" element={<TOEICPart7_2025_Test6 />} />
                    <Route path="/toeic-part7-2025-test-7" element={<TOEICPart7_2025_Test7 />} />
                    <Route path="/toeic-part7-2025-test-8" element={<TOEICPart7_2025_Test8 />} />
                    <Route path="/toeic-part7-2025-test-9" element={<TOEICPart7_2025_Test9 />} />
                    <Route path="/toeic-part7-2025-test-10" element={<TOEICPart7_2025_Test10 />} />
                    <Route path="/toeic-part7-2024-test-1" element={<TOEICPart7_2024_Test1 />} />
                    <Route path="/toeic-part7-2024-test-2" element={<TOEICPart7_2024_Test2 />} />
                    <Route path="/toeic-part7-2024-test-3" element={<TOEICPart7_2024_Test3 />} />
                    <Route path="/toeic-part7-2024-test-4" element={<TOEICPart7_2024_Test4 />} />
                    <Route path="/toeic-part7-2024-test-5" element={<TOEICPart7_2024_Test5 />} />
                    <Route path="/toeic-part7-2024-test-6" element={<TOEICPart7_2024_Test6 />} />
                    <Route path="/toeic-part7-2024-test-7" element={<TOEICPart7_2024_Test7 />} />
                    <Route path="/toeic-part7-2024-test-8" element={<TOEICPart7_2024_Test8 />} />
                    <Route path="/toeic-part7-2024-test-9" element={<TOEICPart7_2024_Test9 />} />
                    <Route path="/toeic-part7-2024-test-10" element={<TOEICPart7_2024_Test10 />} />
                    <Route path="/toeic-part7-2023-test-1" element={<TOEICPart7_2023_Test1 />} />
                    <Route path="/toeic-part7-2023-test-2" element={<TOEICPart7_2023_Test2 />} />
                    <Route path="/toeic-part7-2023-test-3" element={<TOEICPart7_2023_Test3 />} />
                    <Route path="/toeic-part7-2023-test-4" element={<TOEICPart7_2023_Test4 />} />
                    <Route path="/toeic-part7-2023-test-5" element={<TOEICPart7_2023_Test5 />} />
                    <Route path="/toeic-part7-2023-test-6" element={<TOEICPart7_2023_Test6 />} />
                    <Route path="/toeic-part7-2023-test-7" element={<TOEICPart7_2023_Test7 />} />
                    <Route path="/toeic-part7-2023-test-8" element={<TOEICPart7_2023_Test8 />} />
                    <Route path="/toeic-part7-2023-test-9" element={<TOEICPart7_2023_Test9 />} />
                    <Route path="/toeic-part7-2023-test-10" element={<TOEICPart7_2023_Test10 />} />
                    <Route path="/toeic-part7-2022-test-1" element={<TOEICPart7_2022_Test1 />} />
                    <Route path="/toeic-part7-2022-test-2" element={<TOEICPart7_2022_Test2 />} />
                    <Route path="/toeic-part7-2022-test-3" element={<TOEICPart7_2022_Test3 />} />
                    <Route path="/toeic-part7-2022-test-4" element={<TOEICPart7_2022_Test4 />} />
                    <Route path="/toeic-part7-2022-test-5" element={<TOEICPart7_2022_Test5 />} />
                    <Route path="/toeic-part7-2022-test-6" element={<TOEICPart7_2022_Test6 />} />
                    <Route path="/toeic-part7-2022-test-7" element={<TOEICPart7_2022_Test7 />} />
                    <Route path="/toeic-part7-2022-test-8" element={<TOEICPart7_2022_Test8 />} />
                    <Route path="/toeic-part7-2022-test-9" element={<TOEICPart7_2022_Test9 />} />
                    <Route path="/toeic-part7-2022-test-10" element={<TOEICPart7_2022_Test10 />} />
                    <Route path="/toeic-part7-2020-test-1" element={<TOEICPart7_2020_Test1 />} />
                    <Route path="/toeic-part7-2020-test-2" element={<TOEICPart7_2020_Test2 />} />
                    <Route path="/toeic-part7-2020-test-3" element={<TOEICPart7_2020_Test3 />} />
                    <Route path="/toeic-part7-2020-test-4" element={<TOEICPart7_2020_Test4 />} />
                    <Route path="/toeic-part7-2020-test-5" element={<TOEICPart7_2020_Test5 />} />
                    <Route path="/toeic-part7-2020-test-6" element={<TOEICPart7_2020_Test6 />} />
                    <Route path="/toeic-part7-2020-test-7" element={<TOEICPart7_2020_Test7 />} />
                    <Route path="/toeic-part7-2020-test-8" element={<TOEICPart7_2020_Test8 />} />
                    <Route path="/toeic-part7-2020-test-9" element={<TOEICPart7_2020_Test9 />} />
                    <Route path="/toeic-part7-2020-test-10" element={<TOEICPart7_2020_Test10 />} />
                    <Route path="/toeic-part7-2019-test-1" element={<TOEICPart7_2019_Test1 />} />
                    <Route path="/toeic-part7-2019-test-2" element={<TOEICPart7_2019_Test2 />} />
                    <Route path="/toeic-part7-2019-test-3" element={<TOEICPart7_2019_Test3 />} />
                    <Route path="/toeic-part7-2019-test-4" element={<TOEICPart7_2019_Test4 />} />
                    <Route path="/toeic-part7-2019-test-5" element={<TOEICPart7_2019_Test5 />} />
                    <Route path="/toeic-part7-2019-test-6" element={<TOEICPart7_2019_Test6 />} />
                    <Route path="/toeic-part7-2019-test-7" element={<TOEICPart7_2019_Test7 />} />
                    <Route path="/toeic-part7-2019-test-8" element={<TOEICPart7_2019_Test8 />} />
                    <Route path="/toeic-part7-2019-test-9" element={<TOEICPart7_2019_Test9 />} />
                    <Route path="/toeic-part7-2019-test-10" element={<TOEICPart7_2019_Test10 />} />
                    <Route path="/toeic-part7-hacker-vol3-test-1" element={<TOEICPart7_HackerVol3_Test1 />} />
                    <Route path="/toeic-part7-hacker-vol3-test-2" element={<TOEICPart7_HackerVol3_Test2 />} />
                    <Route path="/toeic-part7-hacker-vol3-test-3" element={<TOEICPart7_HackerVol3_Test3 />} />
                    <Route path="/toeic-part7-hacker-vol3-test-4" element={<TOEICPart7_HackerVol3_Test4 />} />
                    <Route path="/toeic-part7-hacker-vol3-test-5" element={<TOEICPart7_HackerVol3_Test5 />} />
                    <Route path="/toeic-part7-hacker-vol3-test-6" element={<TOEICPart7_HackerVol3_Test6 />} />
                    <Route path="/toeic-part7-hacker-vol3-test-7" element={<TOEICPart7_HackerVol3_Test7 />} />
                    <Route path="/toeic-part7-hacker-vol3-test-8" element={<TOEICPart7_HackerVol3_Test8 />} />
                    <Route path="/toeic-part7-hacker-vol3-test-9" element={<TOEICPart7_HackerVol3_Test9 />} />
                    <Route path="/toeic-part7-hacker-vol3-test-10" element={<TOEICPart7_HackerVol3_Test10 />} />
                    <Route path="/toeic-part7-ybm-vol3-test-1" element={<TOEICPart7_YBMVol3_Test1 />} />
                    <Route path="/toeic-part7-ybm-vol3-test-2" element={<TOEICPart7_YBMVol3_Test2 />} />
                    <Route path="/toeic-part7-ybm-vol3-test-3" element={<TOEICPart7_YBMVol3_Test3 />} />
                    <Route path="/toeic-part7-ybm-vol3-test-4" element={<TOEICPart7_YBMVol3_Test4 />} />
                    <Route path="/toeic-part7-ybm-vol3-test-5" element={<TOEICPart7_YBMVol3_Test5 />} />
                    <Route path="/toeic-part7-ybm-vol3-test-6" element={<TOEICPart7_YBMVol3_Test6 />} />
                    <Route path="/toeic-part7-ybm-vol3-test-7" element={<TOEICPart7_YBMVol3_Test7 />} />
                    <Route path="/toeic-part7-ybm-vol3-test-8" element={<TOEICPart7_YBMVol3_Test8 />} />
                    <Route path="/toeic-part7-ybm-vol3-test-9" element={<TOEICPart7_YBMVol3_Test9 />} />
                    <Route path="/toeic-part7-ybm-vol3-test-10" element={<TOEICPart7_YBMVol3_Test10 />} />
                    <Route path="/toeic-part7-2025-test1-cards" element={<TOEICPart7_2025_Test1_CardsHub />} />
                    <Route path="/toeic-part7-2025-test1-card147-148" element={<TOEICPart7_2025_Test1_Card147_148 />} />
                    <Route path="/toeic-part7-2025-test1-card149-150" element={<TOEICPart7_2025_Test1_Card149_150 />} />
                    <Route path="/toeic-part7-2025-test1-card151-152" element={<TOEICPart7_2025_Test1_Card151_152 />} />
                    <Route path="/toeic-part7-2025-test1-card153-154" element={<TOEICPart7_2025_Test1_Card153_154 />} />
                    <Route path="/toeic-part7-2025-test1-card155-157" element={<TOEICPart7_2025_Test1_Card155_157 />} />
                    <Route path="/toeic-part7-2025-test1-card158-160" element={<TOEICPart7_2025_Test1_Card158_160 />} />
                    <Route path="/toeic-part7-2025-test1-card161-163" element={<TOEICPart7_2025_Test1_Card161_163 />} />
                    <Route path="/toeic-part7-2025-test1-card164-167" element={<TOEICPart7_2025_Test1_Card164_167 />} />
                    <Route path="/toeic-part7-2025-test1-card168-171" element={<TOEICPart7_2025_Test1_Card168_171 />} />
                    <Route path="/toeic-part7-2025-test1-card172-175" element={<TOEICPart7_2025_Test1_Card172_175 />} />
                    <Route path="/toeic-part7-2025-test2-card147-148" element={<TOEICPart7_2025_Test2_Card147_148 />} />
                    <Route path="/toeic-part7-2025-test2-card149-150" element={<TOEICPart7_2025_Test2_Card149_150 />} />
                    <Route path="/toeic-part7-2025-test2-card151-152" element={<TOEICPart7_2025_Test2_Card151_152 />} />
                    <Route path="/toeic-part7-2025-test2-card153-154" element={<TOEICPart7_2025_Test2_Card153_154 />} />
                    <Route path="/toeic-part7-2025-test2-card155-157" element={<TOEICPart7_2025_Test2_Card155_157 />} />
                    <Route path="/toeic-part7-2025-test2-card158-160" element={<TOEICPart7_2025_Test2_Card158_160 />} />
                    <Route path="/toeic-part7-2025-test2-card161-163" element={<TOEICPart7_2025_Test2_Card161_163 />} />
                    <Route path="/toeic-part7-2025-test1-card155-156" element={<TOEICPart7_2025_Test1_CardsHub />} />
                    <Route path="/toeic-part7-2025-test1-card157-158" element={<TOEICPart7_2025_Test1_CardsHub />} />
                    <Route path="/toeic-part7-2025-test1-card159-160" element={<TOEICPart7_2025_Test1_CardsHub />} />
                    <Route path="/toeic-part7-2025-test1-card161-162" element={<TOEICPart7_2025_Test1_CardsHub />} />
                    <Route path="/toeic-part7-2025-test1-card163-164" element={<TOEICPart7_2025_Test1_CardsHub />} />
                    <Route path="/toeic-part7-2025-test1-card165-166" element={<TOEICPart7_2025_Test1_CardsHub />} />
                    <Route path="/toeic-part7-2025-test1-card167-168" element={<TOEICPart7_2025_Test1_CardsHub />} />
                    <Route path="/toeic-part7-2025-test1-card169-170" element={<TOEICPart7_2025_Test1_CardsHub />} />
                    <Route path="/toeic-part7-2025-test1-card171-172" element={<TOEICPart7_2025_Test1_CardsHub />} />
                    <Route path="/toeic-part7-2025-test1-card173-174" element={<TOEICPart7_2025_Test1_CardsHub />} />
                    <Route path="/toeic-part7-2025-test1-card175-176" element={<TOEICPart7_2025_Test1_CardsHub />} />
                    <Route path="/toeic-part7-2025-test1-invo-mini1" element={<TOEICPart7_2025_Test1_INVO_Mini1 />} />
                    <Route path="/toeic-part7-2025-test1-invo-mini2" element={<TOEICPart7_2025_Test1_INVO_Mini2 />} />
                    <Route path="/toeic-part7-2025-test1-invo-mini3" element={<TOEICPart7_2025_Test1_INVO_Mini3 />} />
                    <Route path="/toeic-part7-2025-test1-invo-mini4" element={<TOEICPart7_2025_Test1_INVO_Mini4 />} />
                    <Route path="/toeic-part7-2025-test1-invo-mini5" element={<TOEICPart7_2025_Test1_INVO_Mini5 />} />
                    <Route path="/toeic-part7-2021-test-1" element={<TOEICPart7_2021_Test1 />} />
                    <Route path="/toeic-part7-2021-test-2" element={<TOEICPart7_2021_Test2 />} />
                    <Route path="/toeic-part7-2021-test-3" element={<TOEICPart7_2021_Test3 />} />
                    <Route path="/toeic-part7-2021-test-4" element={<TOEICPart7_2021_Test4 />} />
                    <Route path="/toeic-part7-2021-test-5" element={<TOEICPart7_2021_Test5 />} />
                    <Route path="/ielts-reading-passage1/:passageId?" element={<IELTSReadingPassage1 />} />
                    <Route path="/ielts-reading-passage1-scoring" element={<IELTSReadingPassage1WithScoring />} />
                    <Route path="/ielts-reading-mini-scoring-1" element={<IELTSReadingMiniScoring1 />} />
                    <Route path="/ielts-reading-mini-scoring-2" element={<IELTSReadingMiniScoring2 />} />
                    <Route path="/ielts-reading-mini-tfng" element={<IELTSReadingMiniTFNG />} />
                    <Route path="/ielts-reading-mini-tfng-2" element={<IELTSReadingMiniTFNG2 />} />
        <Route path="/toeic-sentence-arrangement" element={<TOEICSentenceArrangement />} />
        <Route path="/toeic-sentence-arrangement-3" element={<TOEICSentenceArrangement3 />} />
        <Route path="/toeic-sentence-arrangement-4" element={<TOEICSentenceArrangement4 />} />
        <Route path="/toeic-writing-test-2" element={<TOEICWritingTest2 />} />
        <Route path="/toeic-writing-test-5" element={<TOEICWritingTest5 />} />
        <Route path="/toeic-writing-test-6" element={<TOEICWritingTest6 />} />
        <Route path="/toeic-writing-test-7" element={<TOEICWritingTest7 />} />
        <Route path="/toeic-writing-test-8" element={<TOEICWritingTest8 />} />
        <Route path="/toeic-part5-test-1" element={<TOEICPart5Test1 />} />
        <Route path="/toeic-part5-test-1-2020" element={<TOEICPart5Test1_2020 />} />
        <Route path="/toeic-part5-test-2-2020" element={<TOEICPart5Test2_2020 />} />
        <Route path="/toeic-part5-test-3-2020" element={<TOEICPart5Test3_2020 />} />
        <Route path="/toeic-part5-test-4-2020" element={<TOEICPart5Test4_2020 />} />
        <Route path="/toeic-part5-test-5-2020" element={<TOEICPart5Test5_2020 />} />
        <Route path="/toeic-part5-test-6-2020" element={<TOEICPart5Test6_2020 />} />
            <Route path="/toeic-part5-test-7-2020" element={<TOEICPart5Test7_2020 />} />
          <Route path="/toeic-part5-test-8-2020" element={<TOEICPart5Test8_2020 />} />
          <Route path="/toeic-part5-test-9-2020" element={<TOEICPart5Test9_2020 />} />
          <Route path="/toeic-part5-test-10-2020" element={<TOEICPart5Test10_2020 />} />
          <Route path="/toeic-part5-test-1-2019" element={<TOEICPart5Test1_2019 />} />
          <Route path="/toeic-part5-test-2-2019" element={<TOEICPart5Test2_2019 />} />
          <Route path="/toeic-part5-test-3-2019" element={<TOEICPart5Test3_2019 />} />
          <Route path="/toeic-part5-test-4-2019" element={<TOEICPart5Test4_2019 />} />
          <Route path="/toeic-part5-test-5-2019" element={<TOEICPart5Test5_2019 />} />
          <Route path="/toeic-part5-test-6-2019" element={<TOEICPart5Test6_2019 />} />
          <Route path="/toeic-part5-test-7-2019" element={<TOEICPart5Test7_2019 />} />
          <Route path="/toeic-part5-test-8-2019" element={<TOEICPart5Test8_2019 />} />
          <Route path="/toeic-part5-test-9-2019" element={<TOEICPart5Test9_2019 />} />
          <Route path="/toeic-part5-test-10-2019" element={<TOEICPart5Test10_2019 />} />
          <Route path="/toeic-part5-test-1-2021" element={<TOEICPart5Test1_2021 />} />
          <Route path="/toeic-part5-test-1-2022" element={<TOEICPart5Test1_2022 />} />
          <Route path="/toeic-part5-test-2-2022" element={<TOEICPart5Test2_2022 />} />
          <Route path="/toeic-part5-test-3-2022" element={<TOEICPart5Test3_2022 />} />
          <Route path="/toeic-part5-test-4-2022" element={<TOEICPart5Test4_2022 />} />
          <Route path="/toeic-part5-test-5-2022" element={<TOEICPart5Test5_2022 />} />
          <Route path="/toeic-part5-test-6-2022" element={<TOEICPart5Test6_2022 />} />
          <Route path="/toeic-part5-test-7-2022" element={<TOEICPart5Test7_2022 />} />
          <Route path="/toeic-part5-test-8-2022" element={<TOEICPart5Test8_2022 />} />
          <Route path="/toeic-part5-test-9-2022" element={<TOEICPart5Test9_2022 />} />
          <Route path="/toeic-part5-test-10-2022" element={<TOEICPart5Test10_2022 />} />
          <Route path="/toeic-part5-test-1-2023" element={<TOEICPart5Test1_2023 />} />
          <Route path="/toeic-part5-test-2-2023" element={<TOEICPart5Test2_2023 />} />
          <Route path="/toeic-part5-test-3-2023" element={<TOEICPart5Test3_2023 />} />
          <Route path="/toeic-part5-test-4-2023" element={<TOEICPart5Test4_2023 />} />
          <Route path="/toeic-part5-test-5-2023" element={<TOEICPart5Test5_2023 />} />
          <Route path="/toeic-part5-test-6-2023" element={<TOEICPart5Test6_2023 />} />
          <Route path="/toeic-part5-test-7-2023" element={<TOEICPart5Test7_2023 />} />
          <Route path="/toeic-part5-test-8-2023" element={<TOEICPart5Test8_2023 />} />
          <Route path="/toeic-part5-test-9-2023" element={<TOEICPart5Test9_2023 />} />
          <Route path="/toeic-part5-test-10-2023" element={<TOEICPart5Test10_2023 />} />
          <Route path="/toeic-part5-test-1-2024" element={<TOEICPart5Test1_2024 />} />
          <Route path="/toeic-part5-test-2-2024" element={<TOEICPart5Test2_2024 />} />
          <Route path="/toeic-part5-test-3-2024" element={<TOEICPart5Test3_2024 />} />
          <Route path="/toeic-part5-test-4-2024" element={<TOEICPart5Test4_2024 />} />
          <Route path="/toeic-part5-test-5-2024" element={<TOEICPart5Test5_2024 />} />
          <Route path="/toeic-part5-test-6-2024" element={<TOEICPart5Test6_2024 />} />
          <Route path="/toeic-part5-test-7-2024" element={<TOEICPart5Test7_2024 />} />
          <Route path="/toeic-part5-test-8-2024" element={<TOEICPart5Test8_2024 />} />
          <Route path="/toeic-part5-test-9-2024" element={<TOEICPart5Test9_2024 />} />
          <Route path="/toeic-part5-test-10-2024" element={<TOEICPart5Test10_2024 />} />
          <Route path="/toeic-part5-test-1-2025" element={<TOEICPart5Test1_2025 />} />
          <Route path="/toeic-part5-test-2-2025" element={<TOEICPart5Test2_2025 />} />
          <Route path="/toeic-part5-test-3-2025" element={<TOEICPart5Test3_2025 />} />
          <Route path="/toeic-part5-test-4-2025" element={<TOEICPart5Test4_2025 />} />
          <Route path="/toeic-part5-test-5-2025" element={<TOEICPart5Test5_2025 />} />
          <Route path="/toeic-part5-test-6-2025" element={<TOEICPart5Test6_2025 />} />
          <Route path="/toeic-part5-test-7-2025" element={<TOEICPart5Test7_2025 />} />
          <Route path="/toeic-part5-test-8-2025" element={<TOEICPart5Test8_2025 />} />
          <Route path="/toeic-part5-test-9-2025" element={<TOEICPart5Test9_2025 />} />
          <Route path="/toeic-part5-test-10-2025" element={<TOEICPart5Test10_2025 />} />
          <Route path="/toeic-part5-test-1-ybm-vol2" element={<TOEICPart5Test1_YBM_Vol2 />} />
          <Route path="/toeic-part5-test-2-ybm-vol2" element={<TOEICPart5Test2_YBM_Vol2 />} />
          <Route path="/toeic-part5-test-3-ybm-vol2" element={<TOEICPart5Test3_YBM_Vol2 />} />
          <Route path="/toeic-part5-test-4-ybm-vol2" element={<TOEICPart5Test4_YBM_Vol2 />} />
          <Route path="/toeic-part5-test-5-ybm-vol2" element={<TOEICPart5Test5_YBM_Vol2 />} />
          <Route path="/toeic-part5-test-6-ybm-vol2" element={<TOEICPart5Test6_YBM_Vol2 />} />
          <Route path="/toeic-part5-test-7-ybm-vol2" element={<TOEICPart5Test7_YBM_Vol2 />} />
          <Route path="/toeic-part5-test-8-ybm-vol2" element={<TOEICPart5Test8_YBM_Vol2 />} />
          <Route path="/toeic-part5-test-9-ybm-vol2" element={<TOEICPart5Test9_YBM_Vol2 />} />
          <Route path="/toeic-part5-test-10-ybm-vol2" element={<TOEICPart5Test10_YBM_Vol2 />} />
          <Route path="/toeic-part5-test-1-ybm-vol1" element={<TOEICPart5Test1_YBM_Vol1 />} />
          <Route path="/toeic-part5-test-2-ybm-vol1" element={<TOEICPart5Test2_YBM_Vol1 />} />
          <Route path="/toeic-part5-test-3-ybm-vol1" element={<TOEICPart5Test3_YBM_Vol1 />} />
          <Route path="/toeic-part5-test-4-ybm-vol1" element={<TOEICPart5Test4_YBM_Vol1 />} />
          <Route path="/toeic-part5-test-5-ybm-vol1" element={<TOEICPart5Test5_YBM_Vol1 />} />
          <Route path="/toeic-part5-test-6-ybm-vol1" element={<TOEICPart5Test6_YBM_Vol1 />} />
          <Route path="/toeic-part5-test-7-ybm-vol1" element={<TOEICPart5Test7_YBM_Vol1 />} />
          <Route path="/toeic-part5-test-8-ybm-vol1" element={<TOEICPart5Test8_YBM_Vol1 />} />
          <Route path="/toeic-part5-test-9-ybm-vol1" element={<TOEICPart5Test9_YBM_Vol1 />} />
          <Route path="/toeic-part5-test-10-ybm-vol1" element={<TOEICPart5Test10_YBM_Vol1 />} />
          <Route path="/toeic-part5-test-1-ybm-vol3" element={<TOEICPart5Test1_YBM_Vol3 />} />
          <Route path="/toeic-part5-test-2-ybm-vol3" element={<TOEICPart5Test2_YBM_Vol3 />} />
          <Route path="/toeic-part5-test-3-ybm-vol3" element={<TOEICPart5Test3_YBM_Vol3 />} />
          <Route path="/toeic-part5-test-4-ybm-vol3" element={<TOEICPart5Test4_YBM_Vol3 />} />
          <Route path="/toeic-part5-test-5-ybm-vol3" element={<TOEICPart5Test5_YBM_Vol3 />} />
          <Route path="/toeic-part5-test-6-ybm-vol3" element={<TOEICPart5Test6_YBM_Vol3 />} />
          <Route path="/toeic-part5-test-7-ybm-vol3" element={<TOEICPart5Test7_YBM_Vol3 />} />
          <Route path="/toeic-part5-test-8-ybm-vol3" element={<TOEICPart5Test8_YBM_Vol3 />} />
          <Route path="/toeic-part5-test-9-ybm-vol3" element={<TOEICPart5Test9_YBM_Vol3 />} />
          <Route path="/toeic-part5-test-10-ybm-vol3" element={<TOEICPart5Test10_YBM_Vol3 />} />
          <Route path="/toeic-part5-test-1-hacker-vol3" element={<TOEICPart5Test1_HACKER_Vol3 />} />
          <Route path="/toeic-part5-test-2-hacker-vol3" element={<TOEICPart5Test2_HACKER_Vol3 />} />
          <Route path="/toeic-part5-test-3-hacker-vol3" element={<TOEICPart5Test3_HACKER_Vol3 />} />
          <Route path="/toeic-part5-test-4-hacker-vol3" element={<TOEICPart5Test4_HACKER_Vol3 />} />
          <Route path="/toeic-part5-test-5-hacker-vol3" element={<TOEICPart5Test5_HACKER_Vol3 />} />
          <Route path="/toeic-part5-test-6-hacker-vol3" element={<TOEICPart5Test6_HACKER_Vol3 />} />
          <Route path="/toeic-part5-test-7-hacker-vol3" element={<TOEICPart5Test7_HACKER_Vol3 />} />
          <Route path="/toeic-part5-test-8-hacker-vol3" element={<TOEICPart5Test8_HACKER_Vol3 />} />
          <Route path="/toeic-part5-test-9-hacker-vol3" element={<TOEICPart5Test9_HACKER_Vol3 />} />
          <Route path="/toeic-part5-test-10-hacker-vol3" element={<TOEICPart5Test10_HACKER_Vol3 />} />
        <Route path="/toeic-part5-test-2" element={<TOEICPart5Test2 />} />
        <Route path="/toeic-part5-test-2-2021" element={<TOEICPart5Test2_2021 />} />
        <Route path="/toeic-part5-test-3" element={<TOEICPart5Test3 />} />
        <Route path="/toeic-part5-test-3-2021" element={<TOEICPart5Test3_2021 />} />
        <Route path="/toeic-part5-test-4" element={<TOEICPart5Test4 />} />
        <Route path="/toeic-part5-test-4-2021" element={<TOEICPart5Test4_2021 />} />
        <Route path="/toeic-part5-test-5" element={<TOEICPart5Test5 />} />
        <Route path="/toeic-part5-test-5-2021" element={<TOEICPart5Test5_2021 />} />
        <Route path="/toeic-part5-test-6" element={<TOEICPart5Test6 />} />
        <Route path="/toeic-part5-test-7" element={<TOEICPart5Test7 />} />
        <Route path="/toeic-part5-test-8" element={<TOEICPart5Test8 />} />
        <Route path="/toeic-part5-test-9" element={<TOEICPart5Test9 />} />
        <Route path="/toeic-part5-test-10" element={<TOEICPart5Test10 />} />
        <Route path="/toeic-part5-test-11" element={<TOEICPart5Test11 />} />
        <Route path="/toeic-part5-test-12" element={<TOEICPart5Test12 />} />
        <Route path="/toeic-part5-test-13" element={<TOEICPart5Test13 />} />
        <Route path="/toeic-part5-test-14" element={<TOEICPart5Test14 />} />
        <Route path="/toeic-part5-test-15" element={<TOEICPart5Test15 />} />
        <Route path="/kids-flyer-cambridge-part7-test1" element={<KidsFlyerCambridgePart7Test1 />} />
        <Route path="/kids-flyer-cambridge-part7-test2" element={<KidsFlyerCambridgePart7Test2 />} />
        <Route path="/kids-flyer-cambridge-part7-test3" element={<KidsFlyerCambridgePart7Test3 />} />
        <Route path="/kids-flyer-cambridge-part7-test4" element={<KidsFlyerCambridgePart7Test4 />} />
        <Route path="/kids-flyer-cambridge-part7-test5" element={<KidsFlyerCambridgePart7Test5 />} />
        <Route path="/kids-flyer-cambridge-part7-test6" element={<KidsFlyerCambridgePart7Test6 />} />
        <Route path="/kids-flyer-cambridge-part7-test7" element={<KidsFlyerCambridgePart7Test7 />} />
        <Route path="/kids-flyer-cambridge-part7-test8" element={<KidsFlyerCambridgePart7Test8 />} />
        <Route path="/kids-flyer-cambridge-part7-test9" element={<KidsFlyerCambridgePart7Test9 />} />
        <Route path="/kids-flyer-cambridge-part7-test10" element={<KidsFlyerCambridgePart7Test10 />} />
        <Route path="/young-reading-story1" element={<YoungReadingStory1 />} />
        <Route path="/young-reading-hub" element={<ProtectedTestHubRoute><YoungReadingHub /></ProtectedTestHubRoute>} />
        <Route path="/young-writing-hub" element={<YoungWritingHub />} />
        <Route path="/young-writing-sentence-building" element={<YoungWritingSentenceBuildingHub />} />
        <Route path="/young-grammar-hub" element={<YoungGrammarHub />} />
        <Route path="/young-grammar-starter" element={<YoungGrammarStarterList />} />
        <Route path="/young-grammar-starter-lesson-1" element={<YoungGrammarStarterLesson1 />} />
        <Route path="/young-grammar-starter-lesson-2" element={<YoungGrammarStarterLesson2Plural />} />
        <Route path="/young-grammar-starter-lesson-3" element={<YoungGrammarStarterLesson3 />} />
        <Route path="/young-grammar-starter-lesson-4" element={<YoungGrammarStarter4 />} />
        <Route path="/young-grammar-starter-lesson-5" element={<YoungGrammarStarterLesson5 />} />
        <Route path="/young-grammar-starter-lesson-6" element={<YoungGrammarStarterLesson6 />} />
        <Route path="/young-grammar-starter-lesson-7" element={<YoungGrammarStarterLesson7 />} />
        <Route path="/young-grammar-starter-lesson-28" element={<YoungGrammarStarterLesson28 />} />
        <Route path="/young-grammar-starter-lesson-6-review" element={<YoungGrammarStarterLesson6Review />} />
        <Route path="/young-grammar-starter-lesson-5-there-is-are" element={<YoungGrammarStarterLesson5ThereIsAre />} />
        <Route path="/young-grammar-starter-lesson-4-can-cant" element={<YoungGrammarStarterLesson4CanCant />} />
        <Route path="/young-grammar-starter-lesson-3-comparative" element={<YoungGrammarStarterLesson3Comparative />} />
        <Route path="/young-grammar-starter-lesson-2-plural" element={<YoungGrammarStarterLesson2Plural />} />
        <Route path="/young-grammar-starter-review" element={<YoungGrammarStarterReview />} />
        <Route path="/young-grammar-mover" element={<YoungGrammarMoverList />} />
        <Route path="/young-grammar-mover-lesson-1" element={<YoungGrammarMoverLesson1 />} />
        <Route path="/young-grammar-mover-lesson-2" element={<YoungGrammarMoverLesson2 />} />
        <Route path="/young-grammar-mover-lesson-3" element={<YoungGrammarMoverLesson3 />} />
        <Route path="/young-grammar-mover-lesson-4" element={<YoungGrammarMoverLesson4 />} />
        <Route path="/young-grammar-mover-lesson-5" element={<YoungGrammarMoverLesson5 />} />
        <Route path="/young-grammar-mover-lesson-6" element={<YoungGrammarMoverLesson6 />} />
        <Route path="/young-grammar-mover-lesson-7" element={<YoungGrammarMoverLesson7 />} />
        <Route path="/young-grammar-mover-lesson-8" element={<YoungGrammarMoverLesson8 />} />
        <Route path="/young-grammar-mover-lesson-9" element={<YoungGrammarMoverLesson9 />} />
        <Route path="/young-grammar-mover-lesson-10" element={<YoungGrammarMoverLesson10 />} />
        <Route path="/young-grammar-mover-lesson-11" element={<YoungGrammarMoverLesson11 />} />
        <Route path="/young-grammar-mover-lesson-12" element={<YoungGrammarMoverLesson12 />} />
        <Route path="/young-grammar-mover-lesson-13" element={<YoungGrammarMoverLesson13 />} />
        <Route path="/young-grammar-mover-lesson-14" element={<YoungGrammarMoverLesson14 />} />
        <Route path="/young-grammar-mover-lesson-15" element={<YoungGrammarMoverLesson15 />} />
        <Route path="/young-grammar-mover-lesson-16" element={<YoungGrammarMoverLesson16 />} />
        <Route path="/young-grammar-mover-lesson-17" element={<YoungGrammarMoverLesson17 />} />
        <Route path="/young-grammar-mover-lesson-18" element={<YoungGrammarMoverLesson18 />} />
        <Route path="/young-grammar-mover-lesson-19" element={<YoungGrammarMoverLesson19 />} />
        <Route path="/young-grammar-mover-lesson-20" element={<YoungGrammarMoverLesson20 />} />
        <Route path="/young-grammar-flyer" element={<YoungGrammarFlyerList />} />
        <Route path="/young-grammar-flyer-lesson-1" element={<YoungGrammarFlyerLesson1 />} />
        <Route path="/young-grammar-flyer-lesson-2" element={<YoungGrammarFlyerLesson2 />} />
        <Route path="/young-grammar-flyer-lesson-3" element={<YoungGrammarFlyerLesson3 />} />
        <Route path="/young-grammar-flyer-lesson-4" element={<YoungGrammarFlyerLesson4 />} />
        <Route path="/young-grammar-flyer-lesson-5" element={<YoungGrammarFlyerLesson5 />} />
        <Route path="/young-grammar-flyer-lesson-6" element={<YoungGrammarFlyerLesson6 />} />
        <Route path="/young-grammar-flyer-lesson-7" element={<YoungGrammarFlyerLesson7 />} />
        <Route path="/young-grammar-flyer-lesson-8" element={<YoungGrammarFlyerLesson8 />} />
        <Route path="/young-grammar-flyer-lesson-9" element={<YoungGrammarFlyerLesson9 />} />
        <Route path="/young-grammar-flyer-lesson-10" element={<YoungGrammarFlyerLesson10 />} />
        <Route path="/young-grammar-flyer-lesson-11" element={<YoungGrammarFlyerLesson11 />} />
        <Route path="/young-grammar-flyer-lesson-12" element={<YoungGrammarFlyerLesson12 />} />
        <Route path="/young-grammar-flyer-lesson-13" element={<YoungGrammarFlyerLesson13 />} />
        <Route path="/young-grammar-flyer-lesson-14" element={<YoungGrammarFlyerLesson14 />} />
        <Route path="/young-grammar-flyer-lesson-15" element={<YoungGrammarFlyerLesson15 />} />
        <Route path="/young-grammar-flyer-lesson-16" element={<YoungGrammarFlyerLesson16 />} />
        <Route path="/young-grammar-flyer-lesson-17" element={<YoungGrammarFlyerLesson17 />} />
        <Route path="/young-grammar-flyer-lesson-18" element={<YoungGrammarFlyerLesson18 />} />
        <Route path="/young-grammar-flyer-lesson-19" element={<YoungGrammarFlyerLesson19 />} />
        <Route path="/young-grammar-flyer-lesson-20" element={<YoungGrammarFlyerLesson20 />} />
        <Route path="/young-grammar-flyer-lesson-21" element={<YoungGrammarFlyerLesson21 />} />
        <Route path="/young-grammar-flyer-lesson-22" element={<YoungGrammarFlyerLesson22 />} />
        <Route path="/young-grammar-flyer-lesson-23" element={<YoungGrammarFlyerLesson23 />} />
        <Route path="/young-grammar-flyer-lesson-24" element={<YoungGrammarFlyerLesson24 />} />
        <Route path="/young-grammar-flyer-lesson-25" element={<YoungGrammarFlyerLesson25 />} />
        <Route path="/young-hub" element={<YoungHub />} />
        <Route path="/iread" element={<IReadPage />} />
            <Route path="/giao-tiep" element={<GiaoTiepHub />} />
            <Route path="/giao-tiep-chao-hoi" element={<GiaoTiepChaoHoi />} />
            <Route path="/giao-tiep-coffee-shop" element={<GiaoTiepCoffeeShop />} />
            <Route path="/giao-tiep-mua-sam" element={<GiaoTiepMuaSam />} />
            <Route path="/giao-tiep-can" element={<GiaoTiepCan />} />
            <Route path="/giao-tiep-nha-hang" element={<GiaoTiepNhaHang />} />
            <Route path="/giao-tiep-du-lich" element={<GiaoTiepDuLich />} />
            <Route path="/giao-tiep-cong-viec" element={<GiaoTiepCongViec />} />
            <Route path="/giao-tiep-y-te" element={<GiaoTiepYTe />} />
            <Route path="/giao-tiep-giao-duc" element={<GiaoTiepGiaoDuc />} />
            <Route path="/giao-tiep-gia-dinh" element={<GiaoTiepGiaDinh />} />
            <Route path="/giao-tiep-san-bay" element={<GiaoTiepSanBay />} />
            <Route path="/giao-tiep-sieu-thi" element={<GiaoTiepSieuThi />} />
            <Route path="/giao-tiep-cho-go-vap" element={<GiaoTiepGoVapMarket />} />
            <Route path="/giao-tiep-cgv" element={<GiaoTiepCGV />} />
            <Route path="/giao-tiep-quan-lau" element={<GiaoTiepQuanLau />} />
            <Route path="/giao-tiep-hieu-thuoc" element={<GiaoTiepHieuThuoc />} />
            <Route path="/giao-tiep-sua-xe-may" element={<GiaoTiepSuaXeMay />} />
            <Route path="/giao-tiep-cua-hang-dien-thoai" element={<GiaoTiepCuaHangDienThoai />} />
            <Route path="/giao-tiep-cua-hang-hoa" element={<GiaoTiepCuaHangHoa />} />
            <Route path="/giao-tiep-cua-hang-sach" element={<GiaoTiepCuaHangSach />} />
            <Route path="/giao-tiep-moi-dam-cuoi" element={<GiaoTiepMoiDamCuoi />} />
            <Route path="/giao-tiep-cua-hang-thu-cung" element={<GiaoTiepCuaHangThuCung />} />
            <Route path="/giao-tiep-cua-hang-trai-cay" element={<GiaoTiepCuaHangTraiCay />} />
            <Route path="/giao-tiep-moi-sinh-nhat" element={<GiaoTiepMoiSinhNhat />} />
            <Route path="/giao-tiep-tiem-cat-toc" element={<GiaoTiepTiemCatToc />} />
            <Route path="/giao-tiep-cua-hang-dien-may" element={<GiaoTiepCuaHangDienMay />} />
            <Route path="/giao-tiep-du-lich-america" element={<GiaoTiepDuLichAmerica />} />
            <Route path="/giao-tiep-du-lich-da-lat" element={<GiaoTiepDuLichDaLat />} />
            <Route path="/giao-tiep-du-lich-da-nang" element={<GiaoTiepDuLichDanang />} />
            <Route path="/giao-tiep-du-lich-ha-long" element={<GiaoTiepDuLichHalongBay />} />
            <Route path="/giao-tiep-du-lich-han-quoc" element={<GiaoTiepDuLichHanQuoc />} />
            <Route path="/giao-tiep-du-lich-nhat-ban" element={<GiaoTiepDuLichNhatBan />} />
            <Route path="/giao-tiep-du-lich-singapore" element={<GiaoTiepDuLichSingapore />} />
            <Route path="/giao-tiep-du-lich-vung-tau" element={<GiaoTiepDuLichVungTau />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/profile" element={<ProtectedTestHubRoute><ProfilePage /></ProtectedTestHubRoute>} />
                    <Route path="/cambridge-practice/:exam/:partId" element={<CambridgePracticePage />} />
                    <Route path="/banana-achievements" element={<BananaAchievements />} />
                    <Route path="/add-bananas" element={<AddBananasPage />} />
                    {/* Admin portal is now standalone at /admin.html - routes removed from main app */}
                    <Route path="/files" element={<FilesBrowserPage />} />
                <Route path="/voca-hub" element={<VocaHubNew />} />
                <Route path="/ielts-writing-task1-vocabulary" element={<IELTSWritingTask1Vocabulary />} />
                <Route path="/ielts-writing-task2-vocabulary" element={<IELTSWritingTask2Vocabulary />} />
                <Route path="/vstep-writing-task1-vocabulary" element={<VSTEPWritingTask1Vocabulary />} />
                <Route path="/vstep-writing-task2-vocabulary" element={<VSTEPWritingTask2Vocabulary />} />
                <Route path="/toeic-writing-task1-vocabulary" element={<TOEICWritingTask1Vocabulary />} />
                <Route path="/toeic-writing-task2-vocabulary" element={<TOEICWritingTask2Vocabulary />} />
                <Route path="/toeic-writing-task3-vocabulary" element={<TOEICWritingTask3Vocabulary />} />
                <Route path="/writing-hub" element={<WritingHub />} />
                <Route path="/writing-flashcards" element={<WritingFlashcardTrainer />} />
                <Route path="/writing-microtasks" element={<WritingMicroTaskArena />} />
                <Route path="/young-voca" element={<YoungVoca />} />
                <Route path="/kid-sentence-building-selection" element={<KidSentenceBuildingSelection />} />
                <Route path="/kid-sentence-building" element={<KidSentenceBuilding />} />
                <Route path="/speaking-hub" element={<SpeakingHubNew />} />
                <Route path="/ielts-speaking" element={<IELTSSpeaking />} />
                <Route path="/ielts-speaking-part1" element={<IELTSSpeakingPart1 />} />
                <Route path="/ielts-speaking-part1-enhanced" element={<IELTSSpeakingPart1Enhanced />} />
                <Route path="/ielts-speaking-part1-good-service" element={<IELTSSpeakingPart1GoodService />} />
                <Route path="/test-topics" element={<TestTopics />} />
                <Route path="/simple-test" element={<SimpleTest />} />
                <Route path="/ielts-speaking-part2" element={<IELTSSpeakingPart2 />} />
                <Route path="/ielts-speaking-part3" element={<IELTSSpeakingPart3 />} />
                <Route path="/toeic-speaking" element={<TOEICSpeaking />} />
                <Route path="/toeic-speaking-questions1-2" element={<TOEICSpeakingQuestions1_2 />} />
                <Route path="/toeic-speaking-questions3-4" element={<TOEICSpeakingQuestions3_4 />} />
                <Route path="/toeic-speaking-questions5-7" element={<TOEICSpeakingQuestions5_7 />} />
                <Route path="/toeic-speaking-questions8-10" element={<TOEICSpeakingQuestions8_10 />} />
                <Route path="/toeic-speaking-question11" element={<TOEICSpeakingQuestion11 />} />
                <Route path="/toeic-speaking-full-test1" element={<TOEICSpeakingFullTest1 />} />
                <Route path="/toeic-speaking-full-test2" element={<TOEICSpeakingFullTest2 />} />
                <Route path="/toeic-speaking-full-test3" element={<TOEICSpeakingFullTest3 />} />
                <Route path="/toeic-speaking-full-test4" element={<TOEICSpeakingFullTest4 />} />
                <Route path="/toeic-speaking-full-test5" element={<TOEICSpeakingFullTest5 />} />
                <Route path="/toeic-speaking-full-test6" element={<TOEICSpeakingFullTest6 />} />
                <Route path="/toeic-speaking-full-test7" element={<TOEICSpeakingFullTest7 />} />
                <Route path="/toeic-speaking-full-test8" element={<TOEICSpeakingFullTest8 />} />
                <Route path="/toeic-speaking-full-test9" element={<TOEICSpeakingFullTest9 />} />
                <Route path="/toeic-speaking-full-test10" element={<TOEICSpeakingFullTest10 />} />
                <Route path="/toeic-writing-full-test1" element={<TOEICWritingFullTest1 />} />
                <Route path="/toeic-writing-full-test2" element={<TOEICWritingFullTest2 />} />
                <Route path="/toeic-writing-full-test3" element={<TOEICWritingFullTest3 />} />
                <Route path="/toeic-writing-full-test4" element={<TOEICWritingFullTest4 />} />
                <Route path="/toeic-writing-full-test5" element={<TOEICWritingFullTest5 />} />
                <Route path="/toeic-writing-full-test6" element={<TOEICWritingFullTest6 />} />
                <Route path="/toeic-writing-full-test8" element={<TOEICWritingFullTest8 />} />
                <Route path="/toeic-writing-full-test9" element={<TOEICWritingFullTest9 />} />
                <Route path="/vstep-speaking" element={<VSTEPSpeaking />} />
                <Route path="/vstep-speaking-part1" element={<VSTEPSpeakingPart1 />} />
                <Route path="/vstep-speaking-part2" element={<VSTEPSpeakingPart2 />} />
                <Route path="/vstep-speaking-part3" element={<VSTEPSpeakingPart3 />} />
                <Route path="/vstep-reading-main-idea" element={<VSTEPReadingMainIdeaHub />} />
                <Route path="/vstep-reading-main-idea-test1" element={<VSTEPReadingMainIdeaTest1 />} />
                <Route path="/vstep-reading-main-idea-test2" element={<VSTEPReadingMainIdeaTest2 />} />
                <Route path="/vstep-reading-main-idea-test3" element={<VSTEPReadingMainIdeaTest3 />} />
                <Route path="/vstep-reading-main-idea-test4" element={<VSTEPReadingMainIdeaTest4 />} />
                <Route path="/vstep-reading-main-idea-test5" element={<VSTEPReadingMainIdeaTest5 />} />
                <Route path="/vstep-reading-main-idea-test6" element={<VSTEPReadingMainIdeaTest6 />} />
                <Route path="/vstep-reading-vocabulary" element={<VSTEPReadingVocabulary />} />
                <Route path="/vstep-reading-vocabulary-test1" element={<VSTEPReadingVocabularyTest1 />} />
                <Route path="/vstep-reading-vocabulary-test2" element={<VSTEPReadingVocabularyTest2 />} />
                <Route path="/vstep-reading-vocabulary-test3" element={<VSTEPReadingVocabularyTest3 />} />
                <Route path="/vstep-reading-vocabulary-test4" element={<VSTEPReadingVocabularyTest4 />} />
                <Route path="/vstep-reading-vocabulary-test5" element={<VSTEPReadingVocabularyTest5 />} />
                <Route path="/vstep-reading-vocabulary-test6" element={<VSTEPReadingVocabularyTest6 />} />
                <Route path="/vstep-reading-vocabulary-test7" element={<VSTEPReadingVocabularyTest7 />} />
                <Route path="/vstep-reading-vocabulary-test8" element={<VSTEPReadingVocabularyTest8 />} />
                <Route path="/vstep-reading-vocabulary-test9" element={<VSTEPReadingVocabularyTest9 />} />
                <Route path="/vstep-reading-vocabulary-test11" element={<VSTEPReadingVocabularyTest11 />} />
                <Route path="/vstep-reading-vocabulary-test12" element={<VSTEPReadingVocabularyTest12 />} />
                <Route path="/vstep-reading-detail" element={<VSTEPReadingDetail />} />
                <Route path="/vstep-reading-inference" element={<VSTEPReadingInference />} />
                <Route path="/vstep-reading-synthesis" element={<VSTEPReadingSynthesis />} />
                <Route path="/vstep-reading-other" element={<VSTEPReadingOther />} />
                <Route path="/ielts-writing-task1" element={<IELTSWritingTask1 />} />
                <Route path="/ielts-writing-task2" element={<IELTSWritingTask2 />} />
                <Route path="/vstep-writing-task1" element={<VSTEPWritingTask1 />} />
                <Route path="/vstep-writing-task2" element={<VSTEPWritingTask2 />} />
                <Route path="/toeic-writing-task1" element={<TOEICWritingTask1 />} />
                <Route path="/toeic-writing-task2" element={<TOEICWritingTask2 />} />
                <Route path="/toeic-writing-task3" element={<TOEICWritingTask3 />} />
                <Route path="/test-hub-basic-a-an-plurals" element={<ProtectedTestHubRoute><TestHubBasicAAnPlurals /></ProtectedTestHubRoute>} />
                <Route path="/test-hub-basic-so-such" element={<ProtectedTestHubRoute><TestHubBasicSoSuch /></ProtectedTestHubRoute>} />
                <Route path="/test-hub-basic-question-words" element={<ProtectedTestHubRoute><TestHubBasicQuestionWords /></ProtectedTestHubRoute>} />
                <Route path="/test-hub-basic-advanced-grammar" element={<ProtectedTestHubRoute><TestHubBasicAdvancedGrammar /></ProtectedTestHubRoute>} />
                <Route path="/grammar-lessons" element={<ProtectedTestHubRoute><GrammarLessonsHub /></ProtectedTestHubRoute>} />
                <Route path="/grammar-lessons/lesson-:lessonId" element={<ProtectedTestHubRoute><GrammarLesson /></ProtectedTestHubRoute>} />
                    <Route path="*" element={<Navigate to="/grammar" replace />} />
                </Routes>
            </main>
        </>
    );
};

function App() {
    return (
        <AuthProvider>
          <ScoreAnimationProvider>
            <HashRouter
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true
                }}
            >
                <AppLayout />
                </HashRouter>
            </ScoreAnimationProvider>
        </AuthProvider>
    );
}

export default App;
