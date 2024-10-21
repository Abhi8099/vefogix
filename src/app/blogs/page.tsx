
import { fetchMeta } from "../action";
import FollowingPointerDemo from "@/components/bloglist";



export default function Blogs(){
 return   <FollowingPointerDemo/>
}

export async function generateMetadata( ){
    let metaTitle = '';
    let metaDescription = '';
    let metaKeyword = '';
    let index = false;
    try {
      const metaData = await fetchMeta("blogs");
  
      // Set metadata based on the fetched data
      metaTitle = metaData.metaTitle || metaTitle;
      metaDescription = metaData.metaDescription || metaDescription;
      metaKeyword = metaData.metaKeywords || metaKeyword;
      index = metaData.index;
    } catch (error) {
      console.error('Error fetching meta data:', error);
    }
    return {
      title: metaTitle,
      description: metaDescription,
      keywords: metaKeyword,
      robots: index ? 'index,follow' : 'noindex,nofollow',
    };
  }