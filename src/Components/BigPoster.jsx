import { motion } from 'framer-motion';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
// icons
import { FaInfoCircle } from 'react-icons/fa';
// git images
import { getImages } from '../helper';
// get genres data
import { movieGenres, tvGenres } from '../genres';

const BigPosterContainer = styled(motion.div)`
    background: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75)),
        url(${(props) => props.poster}) center;
    background-size: cover;
    color: var(--white-100);
    height: 120vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 2rem;
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        height: 100vh;
    }
`;

const BigPosterInner = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2rem 5rem;
    margin: 0 30% 0 2rem;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        height: 75%;
        padding: 1rem;
        margin: 25% 15% 0 2rem;
    }
`;

const BigTitle = styled.h2`
    font-size: 2.5rem;
    letter-spacing: 2px;
    text-shadow: var(--accent-yellow) 1px 0 10px;
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        line-height: 1.5;
    }
`;

const BigOriginalTitle = styled.h4`
    margin-top: 1rem;
    font-size: 1.5rem;
    letter-spacing: 1px;
    text-shadow: var(--accent-yellow) 0.5px 0 5px;
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        line-height: 1.25;
    }
`;

const BigStory = styled.p`
    font-size: 0.85rem;
    width: 85%;
    height: 100%;
    overflow-y: scroll;
    letter-spacing: 2px;
    line-height: 1.5;
    margin: 2rem 0;
`;

const BigGenres = styled.p`
    font-size: 0.9rem;
    font-style: italic;
    color: var(--white-200);
    margin: 2rem 0;
`;

const BigGoDetail = styled.div`
    padding: 1rem 2rem 1rem 0;
    font-size: 1.5rem;
    transition: 300ms all;
    display: flex;
    align-items: center;
    a {
        color: var(--accent-red);
        margin: 0 1rem;
        transition: 300ms all;
        &:last-child {
            color: var(--white-100);
        }
        &:hover {
            color: var(--accent-red);
            opacity: 0.75;
            transform: scale(1.15);
        }
    }
`;

const BigAdult = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    color: var(--accent-red);
    border: 1px solid var(--accent-red);
    font-size: 1.25rem;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function BigPoster({ bigPosterItem, mediaType }) {
    // get genre data
    const genreNames =
        mediaType === 'movie'
            ? bigPosterItem.genre_ids.map((id) => {
                  const genre = movieGenres.genres.find(
                      (genre) => genre.id === id
                  );
                  return genre ? genre.name : '';
              })
            : bigPosterItem.genre_ids.map((id) => {
                  const genre = tvGenres.genres.find(
                      (genre) => genre.id === id
                  );
                  return genre ? genre.name : '';
              });

    return (
        <BigPosterContainer poster={getImages(bigPosterItem.poster_path)}>
            <BigPosterInner>
                <BigTitle>
                    {mediaType === 'movie'
                        ? bigPosterItem.title
                        : bigPosterItem.name}
                    <span> ({bigPosterItem.vote_average.toFixed(1)})</span>
                </BigTitle>
                <BigOriginalTitle>
                    {mediaType === 'movie'
                        ? bigPosterItem.original_title
                        : bigPosterItem.original_name}
                </BigOriginalTitle>
                <BigStory>
                    {bigPosterItem.overview !== ''
                        ? bigPosterItem.overview
                        : 'The story data is not found'}
                </BigStory>

                <BigGenres>
                    {genreNames.filter((name) => name !== '').join(', ')}
                </BigGenres>
                <BigGoDetail>
                    <Link
                        to={
                            mediaType === 'movie'
                                ? `/detail/movie/${bigPosterItem.id}`
                                : `/detail/tv/${bigPosterItem.id}`
                        }
                    >
                        <FaInfoCircle />
                    </Link>
                </BigGoDetail>
                {bigPosterItem.adult && (
                    <BigAdult>
                        <span>18</span>
                    </BigAdult>
                )}
            </BigPosterInner>
        </BigPosterContainer>
    );
}
