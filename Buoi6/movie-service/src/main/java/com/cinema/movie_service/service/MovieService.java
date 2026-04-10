package com.cinema.movie_service.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.cinema.movie_service.entity.Movie;
import com.cinema.movie_service.repository.MovieRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;

    public List<Movie> getAllMovies() {
        return movieRepository.findAll(Sort.by(Sort.Direction.ASC, "showTime"));
    }

    public Movie createMovie(Movie movie) {
        movie.setId(null);
        return movieRepository.save(movie);
    }
}
