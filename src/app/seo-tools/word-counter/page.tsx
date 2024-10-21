"use client";
import React, { useState, useEffect } from 'react';
import HeaderComp from "@/components/HeaderComp";
import { FooterFour } from '@/components/Footer';

export default function WordCounter() {
    const [text, setText] = useState('');
    const [stats, setStats] = useState({
        characterCount: 0,
        wordCount: 0,
        sentenceCount: 0,
        paragraphCount: 0,
        readingTime: 0,
        longestWord: '',
        uniqueWordCount: 0,
        averageWordLength: 0,
        spacesCount: 0,
    });
    const [keywordDensity, setKeywordDensity] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const words = text.trim().split(/\s+/).filter(word => word !== '');
        const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim() !== '');
        const paragraphs = text.split(/\n+/).filter(paragraph => paragraph.trim() !== '');
        const readingTimeMinutes = Math.ceil(words.length / 200); // Assuming average reading speed of 200 words per minute
        const uniqueWords = new Set(words);
        const longestWord = words.reduce((longest, current) => current.length > longest.length ? current : longest, '');
        const totalWordLength = words.reduce((total, word) => total + word.length, 0);
        const averageWordLength = words.length > 0 ? (totalWordLength / words.length).toFixed(2) : 0;
        const spacesCount = text.split(' ').length - 1;
        const wordFrequency: { [key: string]: number } = {};
        words.forEach(word => {
            wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        });

        setStats({
            characterCount: text.length,
            wordCount: words.length,
            sentenceCount: sentences.length,
            paragraphCount: paragraphs.length,
            readingTime: readingTimeMinutes,
            longestWord: longestWord,
            uniqueWordCount: uniqueWords.size,
            averageWordLength: Number(averageWordLength),
            spacesCount: spacesCount,
        });

        setKeywordDensity(wordFrequency);
    }, [text]);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const clearText = () => {
        setText('');
    };

    return (
        <div className='bg-gradient-to-br from-blue-100 to-purple-100'>
            <HeaderComp />
            <div className=" bg-transparent flex flex-col items-center justify-center py-8 px-4 ">
                <div className="flex flex-col lg:flex-row gap-8 w-full lg:w-11/12 xl:w-10/12 max-w-7xl mx-auto my-10">
                    {/* Word Counter Section */}
                    <div className="lg:w-2/3 bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-4xl font-bold mb-6 text-left text-primary">Word Counter</h3>
                        <textarea
                            value={text}
                            onChange={handleTextChange}
                            placeholder="Type or paste your text here..."
                            className="w-full h-48 p-4 mb-4 border border-gray-300 rounded-lg resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex justify-between mb-6">
                            <button
                                onClick={clearText}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                            >
                                Clear Text
                            </button>
                            <p className="text-gray-500 text-sm">* Word counter updates automatically</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <StatCard title="Characters" value={stats.characterCount} />
                            <StatCard title="Words" value={stats.wordCount} />
                            <StatCard title="Sentences" value={stats.sentenceCount} />
                            <StatCard title="Paragraphs" value={stats.paragraphCount} />
                            <StatCard title="Reading Time" value={`${stats.readingTime} min`} />
                            <StatCard title="Longest Word" value={stats.longestWord} />
                            <StatCard title="Unique Words" value={stats.uniqueWordCount} />
                            <StatCard title="Average Word Length" value={`${stats.averageWordLength} chars`} />
                            <StatCard title="Spaces" value={stats.spacesCount} />
                        </div>
                    </div>

                    {/* Keyword Density Section */}
                    <div className="lg:w-1/3 bg-white rounded-lg shadow-lg p-6 ">
                        <h3 className="text-4xl font-bold mb-4 text-left text-primary">Keyword Density</h3>
                        <div className="h-[500px] overflow-y-auto">
                        <ul className="list-disc list-inside">
    {Object.entries(keywordDensity)
        .sort(([, countA], [, countB]) => countB - countA) // Sort by count in descending order
        .map(([word, count]) => (
            <li key={word} className="text-gray-700 text-lg py-0.5">
                {word}: <span className="font-bold">{count}</span>
            </li>
        ))}
</ul>

                        </div>
                    </div>
                </div>

                <div className="flex flex-col  gap-8 w-full lg:w-11/12 xl:w-10/12 max-w-7xl mx-auto my-10">
                    <h3 className="text-4xl font-bold mb-4 text-left text-primary">What is WordCounter?</h3>
                    <h3>Apart from counting words and characters, our online editor can help you to improve word choice and writing style, and, optionally, help you to detect grammar mistakes and plagiarism. To check word count, simply place your cursor into the text box above and start typing. You&apos;ll see the number of characters and words increase or decrease as you type, delete, and edit them. You can also copy and paste text from another program over into the online editor above. The Auto-Save feature will make sure you won&apos;t lose any changes while editing, even if you leave the site and come back later. Tip: Bookmark this page now.
                        Knowing the word count of a text can be important. For example, if an author has to write a minimum or maximum amount of words for an article, essay, report, story, book, paper, you name it. WordCounter will help to make sure its word count reaches a specific requirement or stays within a certain limit.
                        In addition, WordCounter shows you the top 10 keywords and keyword density of the article you&apos;re writing. This allows you to know which keywords you use how often and at what percentages. This can prevent you from over-using certain words or word combinations and check for best distribution of keywords in your writing.
                        In the Details overview you can see the average speaking and reading time for your text, while Reading Level is an indicator of the education level a person would need in order to understand the words you&apos;re using.
                        Disclaimer: We strive to make our tools as accurate as possible but we cannot guarantee it will always be so.</h3>

                </div>
            </div>













            
            <FooterFour />
        </div>

    );
}

function StatCard({ title, value }: { title: string; value: number | string }) {
    return (
        <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-md">
            <h2 className="text-sm font-medium text-gray-600 mb-1">{title}</h2>
            <p className="text-2xl font-bold text-primary">{value}</p>
        </div>
    );
}
