import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
  'Frontend Developer',
  'Backend Developer',
  'Data Science',
  'Graphic Designer',
  'FullStack Developer',
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  return (
    <div className="bg-[#f9f9f9] py-12 px-6 rounded-xl shadow-sm mx-4 sm:mx-10 md:mx-auto max-w-5xl my-20">
      <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">Explore by Category</h2>
      <Carousel className="w-full">
        <CarouselContent className="flex items-center">
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 flex justify-center"
            >
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="ghost"
                className="rounded-full px-6 py-3 bg-gradient-to-r from-purple-400 to-blue-500 text-white hover:opacity-90 transition shadow-md"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hover:scale-105 transition text-gray-600 hover:text-black" />
        <CarouselNext className="hover:scale-105 transition text-gray-600 hover:text-black" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
