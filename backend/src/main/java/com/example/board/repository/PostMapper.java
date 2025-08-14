package com.example.board.repository;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.example.board.dto.PostSummaryDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PostMapper {
  List<PostSummaryDto> getPostList(
      @Param("boardId") Long boardId,
      @Param("q") String q,
      @Param("offset") int offset,
      @Param("size") int size
  );
  int getPostListCount(
	      @Param("boardId") Long boardId,
	      @Param("q") String q
	  );
}