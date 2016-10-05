var API = (function() {
  'use strict';

  var GET = 'GET';
  var POST = 'POST';

  // var getTeam = '/api/v1/board/all';
  // var getBoard = '/api/v1/board/';
  // var getBoardAll = '/api/v1/board/all';
  // var getComment = '/api/v1/board/comment/';
  // var postUploadBoard = '/api/v1/board/upload/board';
  // var postUploadEditedBoard = '/api/v1/board/upload/edited/board';
  // var getDeleteBoard = '/api/v1/board/delete/';
  // var postUploadImage = '/api/v1/board/upload/image';
  // var getDownloadImage = '/api/v1/board/download/';
  // var postComment = '/api/v1/board/comment/';


  var getTeam = 'http://localhost:8080/api/v1/board/all/';
  var getBoard = 'http://localhost:8080/api/v1/board/';
  var getBoardAll = 'http://localhost:8080/api/v1/board/all/';
  var getComment = 'http://localhost:8080/api/v1/board/comment/';
  var postUploadBoard = 'http://localhost:8080/api/v1/board/upload/board/';
  var postUploadEditedBoard = 'http://localhost:8080/api/v1/board/upload/edited/board/';
  var getDeleteBoard = 'http://localhost:8080/api/v1/board/delete/';
  var postUploadImage = 'http://localhost:8080/api/v1/board/upload/image/';
  var getDownloadImage = 'http://localhost:8080/api/v1/board/download/';
  var postComment = 'http://localhost:8080/api/v1/board/comment/';

  /*----------- API Interface -----------------*/
  return {
    GET: GET,
    POST: POST,
    getTeam: getTeam,
    getBoard: getBoard,
    getBoardAll: getBoardAll,
    getComment: getComment,
    postUploadBoard: postUploadBoard,
    postUploadEditedBoard: postUploadEditedBoard,
    getDeleteBoard: getDeleteBoard,
    postUploadImage: postUploadImage,
    getDownloadImage: getDownloadImage,
    postComment: postComment
  };
  /*------------------------------------------------------*/
})(API);
