const Feed = require('../models/feed');
const User = require('../models/user');
exports.createFeed = (req, res, next) => {
    console.log(req.body);
    const title = req.body.title;
    const description = req.body.description;
    const timeReq = req.body.timeReq;
    const skillsets = req.body.skillsets;
    let creator = req.body.creator;
    const feed = new Feed({
        title: title,
        description: description,
        timeReq: timeReq,
        skillsets: skillsets,
        creator: creator//req.body.userId
    });

    feed.save()
        .then(result => {
            return User.findById(creator);
        })
        .then(user => {
            user.associatedPosts.push(feed);
            creator = user;
            return user.save();
        }).then(result => {
            res.status(201).json({
                message: 'Post Created Successfully',
                feed: feed,
                creator: { _id: creator._id, name: creator.name }
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

}

exports.getFeed = (req, res, next) => {
    const skill = req.body.skill;
    console.log(skill);
    let relevant = [];
    Feed.find().populate('creator')
        .then(posts => {
            
            posts.map(post => {
                let topush = false;
                post.skillsets.map(sk => {
                    if (sk === skill) {
                        
                        topush = true;
                     }
                 
                })

                if (topush) {
                    relevant.push(post);
                }
                
            })
            console.log('Feed returned');

            res.status(200).json({relevantJobs: relevant});
        })
    .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Feed.findById(postId).populate('creator')
        .then(post => {
             if (!post) {
                const error = new Error('Could not find post');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: "post fetched", post: post });
    })
    .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.applyJob = (req, res, next) => {
    const postId = req.body.postId;
    const userId = req.body.userId;
    let curUser;
    let postadded;
    User.findById(userId)
        .then(user => {
            curUser = user;
            return Feed.findById(postId);
        
        })
        .then(post => {
            postadded = post;
            post.applied.map(u =>{
                if(u.toString() === userId.toString())
                {  console.log(u)
                    const error = new Error('Already Applied here');
                error.statusCode = 402;
                throw error;}
           }
               ) 
            post.applied.push(curUser);
            return post.save();
        
        })
        .then(result => {
            curUser.associatedPosts.push(result._id);
            
            return curUser.save();


        })
        .then(result => {
            res.status(202).json({
                message: "Application Successful",
                applicant: curUser,
                post: postadded
            })
        })
    .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
    
}

exports.associatedJobs = (req, res, next)=>{
    const userId = req.body.userId;
    User.findById(userId).populate({ path: 'associatedPosts' , populate: {
        path: 'creator'
    }
    }).then(user => {
        
        res.status(202).json({associated: user.associatedPosts});
        
    })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.getSkill = (req, res, next) => {
    let skill = [];
    
    Feed.find()
        .then(posts => {
            posts.map(post => {
                post.skillsets.map(sk => {
                    skill.push(sk);
             })
            })
            
            let fskill = [... new Set(skill)];
            
            res.status(202).json({ skillset: fskill });
 }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.appliedUsers = (req, res, next) => {
    
    const postId = req.body.postId;
    console.log(postId);
    Feed.findById(postId).populate('applied').then(post => {
        res.status(202).json({ applied: post.applied });
    }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
    
}

/*exports.deletePost = (req, res, next) => {
    const postId = req.body.postId;
    let creator;
    let applied = [];
    Feed.findById(postId)
        .then(post => {
            creator = post.creator;
            applied = post.applied;
            return User.findById(creator);
        } )
        .then(user=>{
            res.status(202).json({ creator: user });
        
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

    

}*/