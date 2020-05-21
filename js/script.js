jQuery(document).ready(function ($) {
    function createBookListItem(book) {
        var $li = $('<li>'); //<li></li>
        $li.addClass('list-group-item hover-invert cursor-pointer'); //<li class="list-group-item"></li>
        $li.html(book.title); //<li class="list-group-item">{TEXT}</li>
        $li.data('bookId', book.id);
        return $li;
    }
    $('#cover').prepend(`<button class="btn btn-primary" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Loading...
        </button>`);
    var request = axios.get('http://csc225.mockable.io/books');
    request.then(function (response) {
        response.data.forEach(function (book) {
            // $('#movie-list').append(createMovieListItem(movie.title));
            $('#book-list').prepend(createBookListItem(book));
        });
        $('.list-group-item').on('click', function () {
            $('.list-group-item').removeClass('active');
            var bookId = $(this).data('bookId');
            $(this).addClass('active');
            //$('#cover').html('Loading ...');
            $('#cover').prepend(`<button class="btn btn-primary" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...
            </button>`);
            axios.get('http://csc225.mockable.io/books/' + bookId).then(function (response) {
                //console.log(response.data.cover);

                var $img = $('<img>').attr("width", "250").attr('src', response.data.cover).attr('alt', response.data.title);
                $('#cover').html($img);
                $('#cover').append('<p class="card-title mt-2 h5">' + response.data.title + '</p>')
                .append('<p class="card-text"><b>Author:</b> ' + response.data.author + '</p>')
                .append('<p class="card-text"><b>Country:</b> ' + response.data.country + '</p>')
                .append('<p class="card-text"><b>Language:</b> ' + response.data.language + '</p>')
                .append('<p class="card-text"><b>Published Date:</b> ' + response.data.year + '</p>')
                .append('<p class="card-text"><b>Pages:</b> ' + response.data.pages + '</p>')
                .append('<p class="card-text"><b>Link: </b><a href="' + response.data.link + '" target="blank">'+ response.data.link +'</a></p>');
            });
        });
    });
    
});

