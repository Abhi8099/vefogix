"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BASE_URL } from '@/utils/api';
import axios from 'axios';
import Cookies from 'js-cookie';
import Loader from '@/components/common/Loader';

interface Project {
    id: number;
    name: string;
    status: boolean;
    uid: any;
    title: any;
}

interface SidebarProjectContextProps {
    projects: Project[];
    fetchProjects: () => void;
}

const SidebarProjectContext = createContext<any>(undefined);

export const SidebarProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
const [loading, setLoading] = useState<boolean>(true);
const [projects, setProjects] = useState<Project[]>([]);

    const fetchProjects = async () => {

        const token = Cookies.get("login_access_token");
        if (!token) {
            // alert('You need to log in first.');
            return;
        }
        try {
            const response = await axios.get(`${BASE_URL}projects/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = response.data;
            // console.log('Fetched projects:', response.data);
            setProjects(data);
        } catch (error: any) {
            console.error('Error fetching projects:', error.response);
        }
        finally{
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     fetchProjects();
    // }, []);

    return (
        <SidebarProjectContext.Provider value={{ projects, fetchProjects, loading }}>
            {children}
        </SidebarProjectContext.Provider>
    );
};

export const useSidebarProjects = () => {
    const context = useContext(SidebarProjectContext);
    if (context === undefined) {
        throw new Error('useSidebarProjects must be used within a SidebarProjectProvider');
    }
    return context;
};
