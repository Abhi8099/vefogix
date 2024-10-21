"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/utils/api';
import Cookies from 'js-cookie';

const WebsiteContext = createContext();

export const WebsiteProvider = ({ children }) => {
    const [websites, setWebsites] = useState([]);
    const [publisherTasks, setPublisherTasks] = useState([]);
    const [buyerTasks, setBuyerTasks] = useState([]);

    // Fetch all websites at the start or when needed

    // useEffect(() => {
    //     fetchWebsites();
    //     publisher_Tasks();
    //     buyer_Tasks();
    // }, []);

    const [dataCount, setDataCount] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    const fetchWebsites = async (page = 1, size = 10, searchText = '') => {
        const token = Cookies.get("login_access_token");
        try {
            const response = await axios.get(`${BASE_URL}publisher-sites/`, {
                params: { page, page_size: size, search: searchText },
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            // console.log(response.data);
            setWebsites(response.data.results);
            setDataCount(response.data.count);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch websites:', error);
        }
    };

    // useEffect(() => {
    //     fetchWebsites(currentPage, pageSize);
    // }, [currentPage, pageSize]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchWebsites(page, pageSize,searchText);
    };

    const handlePageSizeChange = (current, size) => {
        setPageSize(size);
        setCurrentPage(1);
        fetchWebsites(1, size,searchText);
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        const searchText = selectedKeys[0];
        setSearchText(searchText);
        fetchWebsites(currentPage, pageSize, searchText);
    };
    
    const handleReset = (clearFilters) => {
        if (clearFilters) {
            clearFilters();
        }
        setSearchText('');
        fetchWebsites(currentPage, pageSize, '');
    };
    // const fetchWebsites = async () => {
    //     const token = Cookies.get("login_access_token");
    //     try {
    //         const response = await axios.get(`${BASE_URL}publisher-sites/`, {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`,
    //             }
    //         });

    //         setWebsites(response.data.results);
    //          console.log(response.data);
    //     } catch (error) {
    //         console.error('Failed to fetch websites:', error);
    //     }
    // };

    const addWebsite = async (websiteData) => {
        const token = Cookies.get("login_access_token");
        try {
            // console.log(websiteData);        

            const response = await axios.post(`${BASE_URL}publisher-sites/`, websiteData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            // console.log('Added website:', response.data);
            setWebsites(prevWebsites => [...prevWebsites, response.data]);
            fetchWebsites();
            return response;
        } catch (error) {
            console.error('Error adding website:', error.response || error);
        }
    };


    const updateWebsite = async (websiteId, updatedData) => {
        // console.log(updatedData);
        const token = Cookies.get("login_access_token");
        // console.log(websiteId);
        try {
            const response = await axios.put(`${BASE_URL}publisher-sites/${websiteId}/`, updatedData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            // console.log('Update response:', response.data);
            setWebsites(prevWebsites =>
                prevWebsites.map(website =>
                    website.uid === websiteId ? { ...website, ...updatedData } : website
                )
            );
            fetchWebsites();
        } catch (error) {
            console.error('Error updating website:', error.response || error);
        }
    };


    const deleteWebsite = async (websiteId) => {
        // console.log('Deleting website with ID:', websiteId); 
        const token = Cookies.get("login_access_token");
        const updatedData = { delete_status: true };

        try {
            await axios.put(`${BASE_URL}publisher-sites/${websiteId}/`, updatedData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setWebsites(prevWebsites => prevWebsites.filter(website => website.id !== websiteId));
            fetchWebsites();
        } catch (error) {
            console.error('Error deleting website:', error.response || error);
        }
    };


    const publisher_Tasks = async () => {
        setLoading(true);
        const token = Cookies.get("login_access_token");
        try {
            const response = await axios.get(`${BASE_URL}my-tasks/publisher/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            setPublisherTasks(response.data);
            // console.log(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch publisherTasks:', error);
        }
    };

    const buyer_Tasks = async () => {
        const token = Cookies.get("login_access_token");
        try {
            const response = await axios.get(`${BASE_URL}my-tasks/buyer/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            setBuyerTasks(response.data);
            // console.log(response.data);
        } catch (error) {
            console.error('Failed to fetch buyerTasks:', error);
        }
    };




    return (
        <WebsiteContext.Provider value={{ websites, addWebsite, updateWebsite, deleteWebsite, fetchWebsites, publisher_Tasks, publisherTasks, buyer_Tasks, buyerTasks, handlePageSizeChange, handlePageChange, pageSize, currentPage, dataCount, loading,handleReset,handleSearch,searchText,setSearchText }}>
            {children}
        </WebsiteContext.Provider>
    );
};

// Custom hook to use the website context
export const useWebsites = () => useContext(WebsiteContext);
