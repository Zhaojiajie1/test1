/* 许多部分js的混合，写的时候有些没注意，
下回会进行好好分类的，不过大多数js部分有注释 */



//轮播图的js
let items = document.getElementsByClassName("item")
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let points = document.getElementsByClassName("point")
let time = 0;
let index = 0;

var Clear = function () {
    for (i = 0; i < items.length; i++) {
        items[i].className = "item";
        points[i].className = "point";
    }
}
var goIndex = function () {
    Clear();
    items[index].className = "item active";
}
btn1.onclick = function goPre() {
    if (index == 0) index = items.length - 1;
    else index--;
    goIndex();
    points[index].className = "point active";
    time = 0;
}
var goNext = function () {
    if (index == items.length - 1) index = 0;
    else index++;
    goIndex();
    points[index].className = "point active";
    time = 0;
}
btn2.onclick = function goNext() {
    if (index == items.length - 1) index = 0;
    else index++;
    goIndex();
    points[index].className = "point active";
    time = 0;
};
setInterval(function () {
    time++;
    if (time == 10) {
        goNext();
        time = 0;
    }
}, 200)

//鼠标浮上去，商品部分的js
let assessments = document.getElementsByClassName("assessment");
let goods = document.getElementsByClassName("div19");

/* assessments[0].style.display = "block";
setTimeout(function () {
    assessments[0].style.transform = "translateY(-90px)";
}, 300) */

let i = 0;
function show(dom) {
    setTimeout(function () {
        dom.style.transform = "translateY(-90px)";
    }, 100)
}

for (i = 0; i < goods.length; i++) {
    goods[i].index = i;
    goods[i].addEventListener("mouseenter", function () {
        let j = this.index;
        show(assessments[j]);

        for (let k = 0; k < goods.length; k++) {
            goods[k].index = k;
            goods[k].addEventListener("mouseleave", function () {
                j = this.index;
                setTimeout(function () {
                    assessments[j].style.transform = "translateY(90px)";
                }, 100)
            })
        }

    })
}
//主体部分高度设置
let box = document.getElementsByClassName('box')[0];
box.style.height = document.getElementsByClassName('show')[0].offsetHeight + 'px';

//页面跳转
let childBox = document.getElementsByClassName('box')[0].children;
let toRegister = document.getElementsByClassName('toRegister')[0];
let toLogin = document.getElementsByClassName('toLogin')[0];
let Register = document.getElementsByClassName("register")[0];
let login = document.getElementsByClassName('login')[0];
let body = document.getElementsByClassName('body')[0];
let toBody = document.getElementsByClassName('toBody')[0];
let toCart = document.getElementsByClassName('toCart')[0];
let cart = document.getElementsByClassName('cart')[0];
//-注册
toRegister.addEventListener('click', function () {
    for (let i = 0; i < childBox.length; i++) {
        childBox[i].classList.remove('show');
    }
    Register.className = Register.className + ' ' + 'show';

    box.style.height = document.getElementsByClassName('show')[0].offsetHeight + 'px';
})
//-登录
toLogin.addEventListener('click', function () {
    for (let i = 0; i < childBox.length; i++) {
        childBox[i].classList.remove('show');
    }
    login.className = login.className + ' ' + 'show';

    box.style.height = document.getElementsByClassName('show')[0].offsetHeight + 'px';
})
//-小米商城
toBody.addEventListener('click', function () {
    for (let i = 0; i < childBox.length; i++) {
        childBox[i].classList.remove('show');
    }
    body.className = body.className + ' ' + 'show';

    box.style.height = document.getElementsByClassName('show')[0].offsetHeight + 'px';
})

//-注册部分JS
let creatUsername = document.getElementById('creatUsername');
let creatPassword = document.getElementById('creatPassword');
let creatName = document.getElementById('creatName');
let creat = document.getElementById('creat');

creat.onclick = function () {
    ajax({
        type: "POST",
        url: "http://180.76.185.37:3000/register",
        data: {
            username: creatUsername.value,
            password: creatPassword.value,
            name: creatName.value,
        },
        async: true,
        success: function (res) {
            res = JSON.parse(res);
            console.log(res);
            if (res.state == "0") {
                alert(res.message);
            }
            else {
                alert(res.message);
                for (let i = 0; i < childBox.length; i++) {
                    childBox[i].classList.remove('show');
                }
                login.className = login.className + ' ' + 'show';

                box.style.height = document.getElementsByClassName('show')[0].offsetHeight + 'px';
            }
        }
    })
}

//插入购物车
let buyBtn = document.getElementsByClassName('buy');
let gid = '';
let cartnumber = 0;

//添加购物车（购买操作）
for (let i = 0; i < buyBtn.length; i++) {
    buyBtn[i].addEventListener('click', function () {
        console.log(token);
        gid = this.parentNode.getAttribute('data-gid');
        //商品信息
        let goodsname = document.getElementsByClassName('goodsname')[gid].innerText;
        let goodsbrand = document.getElementsByClassName('goodsbrand')[gid].innerText;
        let goodsprice = document.getElementsByClassName('goodsprice')[gid].innerText;
        let goodsimg = document.getElementsByClassName('goodsimg')[gid];
        goodsprice = goodsprice.substr(0, goodsprice.length - 1);
        let cartnum = document.getElementsByClassName('cart-num')[0];


        //向购物车中添加数据
        ajax({
            type: 'post',
            url: 'http://180.76.185.37:3000/addCartData',
            data: {
                token: token,
                data: {
                    id: gid,
                    name: goodsname,
                    brand: goodsbrand,
                    imageUrl: goodsimg.src,
                    sales: '10',//暂时的
                    cost: goodsprice,
                    color: 'pink',//暂时暂时
                },
            },
            async: true,
            success: function (res) {
                res = JSON.parse(res);
                console.log(res);
                alert(res.message);
                if (res.state == 1) {
                    //增加购物车显示的数量
                    cartnumber++;
                    cartnum.innerText = cartnumber;
                }
            }
        })
    })
}


//封装一个ajax
function ajax(opt) {
    let defaultParam = {
        type: 'get',
        url: '#',
        data: {},
        async: true,
        success: function () { },
    }

    for (key in opt) {
        defaultParam[key] = opt[key];
    }
    let paramStr = "";
    for (key in defaultParam.data) {
        paramStr += key + '=' + defaultParam.data[key] + '&';
    }
    paramStr = paramStr.substr(0, paramStr.length - 1);

    let xhr = new XMLHttpRequest();
    if (defaultParam.type == 'get') {
        xhr.open(defaultParam.type, defaultParam.url + '?' + paramStr, defaultParam.async);
    } else {
        xhr.open(defaultParam.type, defaultParam.url, defaultParam.async);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(defaultParam.data));
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                defaultParam.success(xhr.responseText);
            }
        }
    }

}