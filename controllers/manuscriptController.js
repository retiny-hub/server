const book = require("../models/book");
const Manuscript = require("../models/manuscript");

module.exports = {
  async createManuscript(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    try {
      const {
        file,
        generalInformation,
        additionalInformation,
        comments,
        manuscript,
        pub
      } = req.body;
      const book = await book.findById(pub);

      if (!file) {
        return res
          .status(400)
          .json({ err: "Please, provided all required data." });
      } else {
      
        const queryManuscript = await Manuscript.find({ auhtor: req.user._id });

        if (queryManuscript.length > 0) {
          const queryDublicate = queryManuscript.filter(
            (item) => item.manuscript === manuscript
          );

          if (queryDublicate[0]?.manuscript == manuscript) {
            return res
              .status(403)
              .json({
                err: `${manuscript} is aleady created. Please try another manuscript.`,
              });
          } else {
            Manuscript.create({
              type:book.type,
              file,
              generalInformation,
              additionalInformation,
              comments,
              manuscript,
              author: req.user._id,
              price:book.price
            }).then((item) => {
              if (item) {
                return res
                  .status(200)
                  .json({
                    resp: `${manuscript} was created successfully. Wait for approval.`,
                  });
              } else {
                return res
                  .status(500)
                  .json({ err: "Sorry, something went wrong." });
              }
            });
          }
        } else {
          Manuscript.create({
              type:book.type,
              file,
              generalInformation,
              additionalInformation,
              comments,
              manuscript,
            author: req.user._id
          }).then((item) => {
            if (item) {
              return res
                .status(200)
                .json({
                  resp: `${manuscript} was created successfully. Wait for approval.`,
                });
            } else {
              return res
                .status(500)
                .json({ err: "Sorry, something went wrong." });
            }
          });
        }
      
      }
    } catch (error) {
      return res.status(500).json({ err: error.message });
    }
  },
  async approveManuscript(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    try {
      const { manuId } = req.params;
      if (!manuId) {
        return res
          .status(400)
          .json({ err: "Please, provide the manuscript's id" });
      } else {
        if (req.user.isAdmin) {
          const queryManuscript = await Manuscript.findById(manuId);
          if (queryManuscript) {
            if (
              queryManuscript?.approved === "pending" ||
              queryManuscript?.approved === "rejected"
            ) {
              Manuscript.findByIdAndUpdate(
                queryManuscript._id,
                { $set: { approved: "approved" } },
                { new: true }
              ).exec((err, resp) => {
                if (err) {
                  return res.status(500).json({ err: err.message });
                } else if (resp) {
                  return res
                    .status(200)
                    .json({ resp: "Item was approved successfully." });
                } else {
                  return res
                    .status(400)
                    .json({ err: "Something went wrong. Try again." });
                }
              });
            } else {
              return res
                .status(400)
                .json({ err: "This item is already approved." });
            }
          } else {
            return res.status(400).json({ err: "This item does not exist." });
          }
        } else {
          return res
            .status(401)
            .json({ err: "Only admin can approve manuscripts." });
        }
      }
    } catch (error) {
      return res.status(500).json({ err: error.message });
    }
  },
  async disapproveManuscript(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    try {
      const { manuId } = req.params;
      if (!manuId) {
        return res
          .status(400)
          .json({ err: "Please, provide the manuscript's id" });
      } else {
        if (req.user.isAdmin) {
          const queryManuscript = await Manuscript.findById(manuId);
          if (queryManuscript) {
            if (
              queryManuscript?.approved === "pending" ||
              queryManuscript?.approved === "approved"
            ) {
              Manuscript.findByIdAndUpdate(
                queryManuscript._id,
                { $set: { approved: "rejected" } },
                { new: true }
              ).exec((err, resp) => {
                if (err) {
                  return res.status(500).json({ err: err.message });
                } else if (resp) {
                  return res
                    .status(200)
                    .json({ resp: "Item was disapproved successfully." });
                } else {
                  return res
                    .status(400)
                    .json({ err: "Something went wrong. Try again." });
                }
              });
            } else {
              return res
                .status(400)
                .json({ err: "This item is already disapproved." });
            }
          } else {
            return res.status(400).json({ err: "This item does not exist." });
          }
        } else {
          return res
            .status(401)
            .json({ err: "Only admin can disapprove manuscripts." });
        }
      }
    } catch (error) {
      return res.status(500).json({ err: error.message });
    }
  },

  // start
  async publishManuscript(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    try {
      const { manuId } = req.params;
      if (!manuId) {
        return res
          .status(400)
          .json({ err: "Please, provide the manuscript's id" });
      } else {
        if (req.user.isAdmin) {
          const queryManuscript = await Manuscript.findById(manuId);
          if (queryManuscript) {
            if (
              !queryManuscript?.published) {
              Manuscript.findByIdAndUpdate(
                queryManuscript._id,
                { $set: { published: true } },
                { new: true }
              ).exec((err, resp) => {
                if (err) {
                  return res.status(500).json({ err: err.message });
                } else if (resp) {
                  return res
                    .status(200)
                    .json({ resp: "Item was published successfully." });
                } else {
                  return res
                    .status(400)
                    .json({ err: "Something went wrong. Try again." });
                }
              });
            } else {
              return res
                .status(400)
                .json({ err: "This item is already published." });
            }
          } else {
            return res.status(400).json({ err: "This item does not exist." });
          }
        } else {
          return res
            .status(401)
            .json({ err: "Only admin can publish manuscripts." });
        }
      }
    } catch (error) {
      return res.status(500).json({ err: error.message });
    }
  },
  async unpublishManuscript(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    try {
      const { manuId } = req.params;
      if (!manuId) {
        return res
          .status(400)
          .json({ err: "Please, provide the manuscript's id" });
      } else {
        if (req.user.isAdmin) {
          const queryManuscript = await Manuscript.findById(manuId);
          if (queryManuscript) {
            if (
              queryManuscript?.published
            ) {
              Manuscript.findByIdAndUpdate(
                queryManuscript._id,
                { $set: { published: false } },
                { new: true }
              ).exec((err, resp) => {
                if (err) {
                  return res.status(500).json({ err: err.message });
                } else if (resp) {
                  return res
                    .status(200)
                    .json({ resp: "Item was unpublished successfully." });
                } else {
                  return res
                    .status(400)
                    .json({ err: "Something went wrong. Try again." });
                }
              });
            } else {
              return res
                .status(400)
                .json({ err: "This item is already unpublished." });
            }
          } else {
            return res.status(400).json({ err: "This item does not exist." });
          }
        } else {
          return res
            .status(401)
            .json({ err: "Only admin can unpublish manuscripts." });
        }
      }
    } catch (error) {
      return res.status(500).json({ err: error.message });
    }
  },
  //end
  async deleteManuscript(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    try {
      const { manuId } = req.params;
      if (!manuId) {
        return res
          .status(400)
          .json({ err: "Please, provided the manuscript's id" });
      } else {
        if (req.user.isAdmin) {
          const queryManuscript = await Manuscript.findById(manuId);
          if (queryManuscript) {
            Manuscript.findByIdAndRemove(queryManuscript._id)
              .then((data) => {
                if (data) {
                  return res
                    .status(200)
                    .json({ resp: "Item was deleted successfully." });
                } else {
                  return res
                    .status(400)
                    .json({ err: "Something went wrong. Try again." });
                }
              })
              .catch((err) => res.status(500).json({ err: err.message }));
          } else {
            return res.status(400).json({ err: "This item does not exist." });
          }
        } else {
          return res
            .status(401)
            .json({ err: "Only admin can delete manuscripts." });
        }
      }
    } catch (error) {
      return res.status(500).json({ err: error.message });
    }
  },
  async getManuscripts(req,res){
    res.set('Access-Control-Allow-Origin', '*');
    try {
        Manuscript.find().then(manuscripts=>{
            if(manuscripts){
                return res.status(200).json({resp:manuscripts})
            }else{
                return res.status(404).json({err:'No manuscript is available for now.'})
            }
        })
    } catch (error) {
        return res.status(500).json({err:error.message})
    }
  },async manuscriptPayment(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    try {
      const {amount,date,item} = req.body;

    const manuscript = await Manuscript.findById(item._id);
      if(manuscript.approved){
        Manuscript.findByIdAndUpdate(item._id,{$set:{paid:true,published:true,payment:{amount,date}}},{new:true})
  .exec((err,resp)=>{
    if(err){
      return res.status(500).json({ err: err.message});
    }else if(resp){
      return res.status(200).json({ resp: `Your ${manuscript.type} has been published successfully.`});
    }else{
      return res.status(500).json({ resp: `Please try again.`});
    }
  })
        
      }else{
        Manuscript.findByIdAndUpdate(item._id,{$set:{paid:true,payment:{amount,date}}},{new:true})
        .exec((err,resp)=>{
          if(err){
            return res.status(500).json({ err: err.message});
          }else if(resp){
            return res.status(200).json({ resp: `${item.title} has been paid for, awaiting approval.`});
          }else{
            return res.status(500).json({ resp: `Please try again.`});
          }
        })
        
      }
    } catch (error) {
      return res.status(500).json({ err: error.message });
    }
  }
};
