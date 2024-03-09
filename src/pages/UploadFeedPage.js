import React from 'react';

function UploadFeedPage() {
    return (
        <div>
            <form method='post' action='http://localhost:8000/feed' >
                <input type="hidden" name="user_id" value="1" />
                <input type="text" name="title" />
                <select name="category">
                    <option value="Gamming">Gamming</option>
                    <option value="Sports">Sports</option>
                    <option value="Business">Business</option>
                    <option value="Crypto">Crypto</option>
                    <option value="Television">Television</option>
                    <option value="Celebrity">Celebrity</option>
                </select>
                <input type="textarea" name="content" />
                <input type="submit" value="업로드" />
            </form>
        </div>
    );
}

export default UploadFeedPage;
