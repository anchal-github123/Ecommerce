let sections=document.querySelectorAll(".Section");
let Main_container=document.querySelector(".Main_container");
let body=document.querySelector("body");
let Addtocart=document.querySelector(".Addtocart")

function loding(){
    body.style.backgroundImage="url(https://databox.com/wp-content/themes/databox/inc/img/templates/ecommerce.jpg)";
}
const gettodolist=()=>
  {
      return JSON.parse(localStorage.getItem ("localarr"));

      // let dyanmic=document.createElement("div");
      //   newdiv.setAttribute("class","Product_box");
      //   Main_container.appendChild(newdiv);
      //      newdiv.innerHTML=`
      //      <img src="${data[count].image}">
      //      <p class="title">${(data[count].title).slice(0,20)}
      //      <p class="Pro_price">Price:${data[count].price}$</p>
      //      <p class="rating"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>${data[count].rating.rate}</P>
      //      <div class="cartbtn">
      //      <button class="Add_to_cart_btn">ADD TO CART<button>
      //      </div>`
      

  }
   let localarr=gettodolist()||[];
function catagories(e)
{
    body.style.background="white";
    console.log(e.target);
    let catagories_type=e.target.innerText.toLowerCase();
    let url=`https://fakestoreapi.com/products/category/${catagories_type}`;
    const callapi=async ()=>{
    try{
        let res=await fetch(url);
        console.log(res);
        let data=await res.json();
        console.log(data);
        let count=0
        data.forEach((ele)=>{
        console.log(ele);
        let newdiv=document.createElement("div");
        newdiv.setAttribute("class","Product_box");
        Main_container.appendChild(newdiv);
        //    let count=0
           newdiv.innerHTML=`
           <img src="${data[count].image}">
           <p class="title">${(data[count].title).slice(0,20)}
           <p class="Pro_price">Price:${data[count].price}$</p>
           <p class="rating"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>${data[count].rating.rate}</P>
           <div class="cartbtn">
           <button class="Add_to_cart_btn">ADD TO CART<button>
           </div>`
           count=count+1;
           });
          let pro_price=0;
          let item_price=0;
          let cart_count=0;
         
          // document.querySelectorAll(".removeBtn").forEach((ele)=>{
          //   ele.addEventListener("click",()=>remove_items(e))
          // }); 
          
          function addcartfun(e)
          {
          let result=confirm("Do you want to add the item into your Cart");
          if(result==true){
          let item_img=e.target.parentElement.parentElement.firstElementChild.src;
          let price=e.target.parentElement.parentElement.childNodes[4].innerText.slice(6,length-1);
          console.log(price);
          
          item_price=Number(price);
        
          let cartdiv=document.createElement("div");
          cartdiv.setAttribute("class","cartbox");
          cartdiv.innerHTML=`<img src="${item_img}">
            <p class="price">${price}$</p>
            <button class="removeBtn"><i class="fa-solid fa-trash"></i>
            <button>`;
          Addtocart.appendChild(cartdiv);
          document.querySelector(".cart_count").innerHTML=`${cart_count=cart_count+1}`;
          pro_price=pro_price+item_price;
          document.querySelector(".Total").innerText=`Total=${pro_price}$`;
          localarr.push({item_img,price})
          localStorage.setItem("Cart_items",JSON.stringify(localarr));
          }
      }
    
       document.querySelectorAll(".Add_to_cart_btn").forEach((ele)=>{
         ele.addEventListener("click",(e)=>addcartfun(e));
        })
      
 
    }
    catch(error){
        console.log(error);
    }
}
  callapi();  
}
sections.forEach((ele)=>{
    // console.log(ele);
    
    ele.addEventListener("click",(e)=>catagories(e))

})
body.addEventListener("load",loding())
