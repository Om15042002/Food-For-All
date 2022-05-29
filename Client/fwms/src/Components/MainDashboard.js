
import React, { useRef } from 'react'
import donorstyles from './DonorPage.module.css';
function MainDashboard() {
    const imageref=useRef();
    const onImageChange=(e)=>{
        console.log(e.target.files[0]);
        let url=URL.createObjectURL(e.target.files[0])
        console.log(url);
    }
    const seePhoto=(e)=>
    {
        e.preventDefault();
    }
  return (
    <><div className="container-fluid pt-3">
    <div className="row">
        <div>
            <form method="POST" enctype="multipart/form-data" ref={imageref}>
                <input type="file" name="image" onChange={onImageChange}/>
                <input type="submit" onClick={seePhoto}/>
            </form>
        </div>
        <img src="/Uploaded_Images/IMG-1.jpg" alt="no"/>
    </div>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro dolore earum qui ullam sapiente nam inventore asperiores libero delectus reprehenderit quia quisquam nostrum, harum veritatis adipisci rem consequatur ducimus? Blanditiis.
    Soluta cumque amet, velit expedita veniam illo fugiat assumenda placeat, nam aut libero earum ipsum eum labore? Doloremque repellendus unde minima exercitationem in fugiat veniam sint, quisquam optio quam pariatur.
    Deleniti optio quis officia natus, quas iusto quibusdam sapiente esse possimus impedit sint nesciunt hic, quae tempore officiis laborum quaerat placeat ipsa! Qui voluptas sed iure officiis, dolorum ipsum non.
    Saepe iste repellat facere obcaecati veritatis aliquid, ipsa optio voluptates quas provident totam dolores ut libero debitis earum consequuntur cum fugit, laboriosam expedita maiores quam? Consequatur porro quis doloremque error.
    Deleniti, pariatur, veritatis recusandae deserunt aut magnam, quibusdam saepe adipisci placeat repudiandae consequuntur ratione ducimus sint nisi sapiente. Soluta amet ab in maiores numquam voluptatibus aliquam labore ex id aspernatur?
    Aspernatur quibusdam ex, ad labore in similique impedit nemo doloremque quo fuga odio non fugiat quis eligendi eaque sapiente. Tempora quia dolorem voluptatem vel, non repellendus atque libero architecto voluptatum?
    Hic consectetur ex magni sapiente, ipsa, esse molestiae exercitationem reprehenderit non similique nostrum deserunt nobis voluptatum reiciendis commodi tenetur, error nesciunt beatae tempore soluta accusantium iste dignissimos eum. Amet, ad.
    Officiis nemo quos a sed, tenetur iure amet, iusto quidem ratione itaque illo doloribus tempore numquam. Deserunt atque nemo, obcaecati doloremque mollitia maxime quia quae vero sit voluptatum voluptate tenetur?
    Id doloremque, porro eius non beatae dignissimos, deserunt voluptatibus quas dolor quae reprehenderit iusto tempore. Hic ab, alias quia itaque sapiente praesentium velit facere in odit enim libero natus aut!
    Nostrum eum perspiciatis a rem laudantium ab similique ut ipsa, repellat sequi nobis sapiente at, temporibus magni eaque odit non perferendis modi ullam quia placeat culpa? Nostrum similique molestias aliquid?
    Expedita voluptatibus culpa dolores, ipsum, rem natus tempore sed pariatur sapiente facere nostrum cupiditate ullam corrupti aperiam similique laudantium modi, consectetur dolorem in laborum dignissimos? Soluta rem blanditiis eum deleniti?
    Sequi praesentium ducimus ullam, optio aut necessitatibus sapiente totam eum neque placeat molestias nulla et porro fuga? Quod exercitationem accusantium sapiente magni, dicta, consequuntur ab obcaecati ipsam dolore vel beatae! Lorem ipsum dolor sit amet consectetur adipisicing elit. Error ab neque temporibus voluptatibus molestias incidunt. Est, ut. Illo velit ex exercitationem, maxime, sequi numquam iste distinctio nulla nam debitis rerum! Lorem ipsum dolor, sit amet consectetur adipisicing elit. A delectus architecto enim deserunt provident reiciendis libero quis assumenda iusto atque, quibusdam qui voluptates natus expedita? Exercitationem saepe quibusdam accusantium blanditiis!
    Loremfdfbrthrbdfwegrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr, velit expedita veniam illo fugiat assumenda placeat, nam aut libero earum ipsum eum labore? Doloremque repellendus unde minima exercitationem in fugiat veniam sint, quisquam optio quam pariatur.
    Deleniti optio quis officia natus, quas iusto quibusdam sapiente esse possimus impedit sint nesciunt hic, quae tempore officiis laborum quaerat placeat ipsa! Qui voluptas sed iure officiis, dolorum ipsum non.
    Saepe iste repellat facere obcaecati veritatis aliquid, ipsa optio voluptates quas provident totam dolores ut libero debitis earum consequuntur cum fugit, laboriosam expedita maiores quam? Consequatur porro quis doloremque error.
    Deleniti, pariatur, veritatis recusandae deserunt aut magnam, quibusdam saepe adipisci placeat repudiandae consequuntur ratione ducimus sint nisi sapiente. Soluta amet ab in maiores numquam voluptatibus aliquam labore ex id aspernatur?
    Aspernatur quibusdam ex, ad labore in similique impedit nemo doloremque quo fuga odio non fugiat quis eligendi eaque sapiente. Tempora quia dolorem voluptatem vel, non repellendus atque libero architecto voluptatum?
    Hic consectetur ex magni sapiente, ipsa, esse molestiae exercitationem reprehenderit non similique nostrum deserunt nobis voluptatum reiciendis commodi tenetur, error nesciunt beatae tempore soluta accusantium iste dignissimos eum. Amet, ad.
    Officiis nemo quos a sed, tenetur iure amet, iusto quidem ratione itaque illo doloribus tempore numquam. Deserunt atque nemo, obcaecati doloremque mollitia maxime quia quae vero sit voluptatum voluptate tenetur?
    Id doloremque, porro eius non beatae dignissimos, deserunt voluptatibus quas dolor quae reprehenderit iusto tempore. Hic ab, alias quia itaque sapiente praesentium velit facere in odit enim libero natus aut!
    Nostrum eum perspiciatis a rem laudantium ab similique ut ipsa, repellat sequi nobis sapiente at, temporibus magni eaque odit non perferendis modi ullam quia placeat culpa? Nostrum similique molestias aliquid?
    Expedita voluptatibus culpa dolores, ipsum, rem natus tempore sed pariatur sapiente facere nostrum cupiditate ullam corrupti aperiam similique laudantium modi, consectetur dolorem in laborum dignissimos? Soluta rem blanditiis eum deleniti?
    Sequi praesentium ducimus ullam, optio aut necessitatibus sapiente totam eum neque placeat molestias nulla et porro fuga? Quod exercitationem accusantium sapiente magni, dicta, consequuntur ab obcaecati ipsam dolore vel beatae! Lorem ipsum dolor sit amet consectetur adipisicing elit. 
</div>
</>
  )
}

export default MainDashboard