import React from 'react';

const Search = () => {
  // Danh sách thể loại âm nhạc
  const genres = [
    { id: 1, name: "Pop" },
    { id: 2, name: "Rock" },
    { id: 3, name: "Hip Hop" },
    { id: 4, name: "Jazz" },
    { id: 5, name: "Classical" },
    { id: 6, name: "Electronic" },
    { id: 7, name: "R&B" },
    { id: 8, name: "Country" },
    { id: 9, name: "Blues" },
    { id: 10, name: "Reggae" },
    { id: 11, name: "Folk" },
    { id: 12, name: "Latin" }
  ];

  // Hàm tạo màu ngẫu nhiên
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <>  
        <div className='px-4 font-bold text-[20px]'>Thể loại:</div>
        <div className="grid grid-cols-4 gap-4 p-4">
            {genres.map((genre) => (
                <div
                key={genre.id}
                id={`genre-${genre.id}`}
                className="rounded-xl h-40 flex items-center justify-center text-center font-semibold text-white text-[18px]"
                style={{ backgroundColor: getRandomColor() }}
                >
                {genre.name}
                </div>
            ))}
        </div>
    </>
    
  );
}

export default Search;
