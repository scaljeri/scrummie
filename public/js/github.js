function getIssues(opts){
    opts.data = opts.data || [];
    opts.page = opts.page || 1;
    var url = 'https://api.github.com/repos/' + opts.username + '/' + opts.repo;
    url += '/issues?callback=?&page=' + opts.page + '&per_page=100&state=' + opts.state;
    $.ajax(url, {
        dataType: 'jsonp',
        success: function(res){
            if(res.meta && res.meta.status == '403'){
                return opts.error(res.data);
            }
            opts.data = $.merge(opts.data, res.data);
            if(res.meta && res.meta.Link){
                if(res.meta.Link[0][1].rel == "next"){
                    opts.page++;
                    getIssues(opts)
                } else {
                    opts.success(opts.data);
                }
            }
        }
    });
}

/* Usage
getIssues({
    username: 'joyent',
    repo: 'node',
    state: 'open',
    success: function(data){
        console.log(data);
    },
    error: function(err){
        console.log(err);
    }
});
*/
