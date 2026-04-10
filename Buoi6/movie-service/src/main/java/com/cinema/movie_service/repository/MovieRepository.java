package com.cinema.movie_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinema.movie_service.entity.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long> {
}
