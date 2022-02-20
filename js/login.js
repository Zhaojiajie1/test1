//登录部分JS
let loginUsername = document.getElementById('loginUsername');
let loginPassword = document.getElementById('loginPassword');
let loginBtn = document.getElementById('login');
let admin = document.getElementById('admin');
let auth = 'user';
let adminBox = document.getElementsByClassName('adminBox')[0];
let userlist = document.getElementsByClassName('userlist')[0];
let tokens = new Array();
let list = 0;
//用户token
let token = '';
//用户name
let name = '';

loginBtn.onclick = function () {
    if (admin.checked) {
        auth = 'admin';
    }
    console.log(auth);
    ajax({
        type: 'post',
        url: "http://180.76.185.37:3000/login",
        data: {
            username: loginUsername.value,
            password: loginPassword.value,
            auth: auth,
        },
        async: true,
        success: function (res) {
            res = JSON.parse(res);
            console.log(res);
            if (res.state === 1) {
                alert(res.message);
                token = res.token;
                console.log(token);
                name = res.name;
                if (auth == "user") {
                    for (let i = 0; i < childBox.length; i++) {
                        childBox[i].classList.remove('show');
                    }
                    body.className = body.className + ' ' + 'show';
                }
                //管理员端
                else {
                    for (let i = 0; i < childBox.length; i++) {
                        childBox[i].classList.remove('show');
                    }
                    adminBox.className = adminBox.className + ' ' + 'show';


                    //管理员页面
                    ajax({
                        type: 'POST',
                        url: 'http://180.76.185.37:3000/getUserData',
                        data: {
                            token: token,
                        },
                        async: true,
                        success: function (res) {
                            res = JSON.parse(res);
                            console.log(res);
                            if (res.state === 1) {
                                res.result.map(item => {
                                    tokens[list] = item.token;
                                    list++;
                                    //创建一行（用户行）
                                    let li = document.createElement('li');
                                    userlist.appendChild(li);//userlist是ul
                                    //创建删除,修改按钮
                                    let spanOfDelete = document.createElement('span');
                                    spanOfDelete.className = 'deleteColumn' + ' ' + 'operate';
                                    let btnOfDelete = document.createElement('button');
                                    btnOfDelete.className = 'deleteBtn' + ' ' + 'Btn';
                                    let spanOfModify = document.createElement('span');
                                    spanOfModify.className = 'modifyColumn' + ' ' + 'operate'
                                    let btnOfModify = document.createElement('button');
                                    btnOfModify.className = 'modifyBtn' + ' ' + 'Btn';

                                    li.appendChild(spanOfDelete);
                                    spanOfDelete.appendChild(btnOfDelete);
                                    btnOfDelete.innerText = "删除";
                                    li.appendChild(spanOfModify);
                                    spanOfModify.appendChild(btnOfModify);
                                    btnOfModify.innerText = "修改";
                                    //创建其余项
                                    let spanOfPassword = document.createElement('span');
                                    spanOfPassword.className = 'operate' + ' ' + 'admin-password';
                                    let spanOfUsername = document.createElement('span');
                                    spanOfUsername.className = 'operate' + ' ' + 'admin-username';
                                    let spanOfName = document.createElement('span');
                                    spanOfName.className = 'operate' + ' ' + 'admin-name';

                                    li.appendChild(spanOfPassword);
                                    spanOfPassword.innerText = item.password;
                                    li.appendChild(spanOfUsername);
                                    spanOfUsername.innerText = item.username;
                                    li.appendChild(spanOfName);
                                    spanOfName.innerText = item.name;


                                    li.className = 'detail';
                                })
                                let deleteBtn = document.getElementsByClassName('deleteBtn');
                                //let modifyBtn = document.getElementsByClassName('modifyBtn');
                                let username = document.getElementsByClassName('admin-username');
                                //console.log(deleteBtn.length);
                                //删除操作
                                for (i = 0; i < deleteBtn.length; i++) {
                                    deleteBtn[i].index = i;
                                    deleteBtn[i].addEventListener('click', function () {
                                        this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
                                        index = this.index;
                                        console.log(index);
                                        ajax({
                                            type: 'post',
                                            url: 'http://180.76.185.37:3000/deleteUser',
                                            data: {
                                                username: username[index].innerText,
                                            },
                                            async: true,
                                            success: function (res) {
                                                res = JSON.parse(res);
                                                console.log(res);
                                            }
                                        })
                                    })
                                }
                                //添加数据操作的盒子出现
                                let addBox = document.getElementsByClassName('addBox')[0];
                                //设置宽高
                                addBox.style.width = document.body.clientWidth + 'px';
                                addBox.style.height = document.getElementsByClassName('show')[0].offsetHeight + 'px';
                                addBox.style.display = 'none';
                                let addBtn = document.getElementsByClassName('addData')[0];
                                let backBtn = document.getElementsByClassName('backBtn')[0];
                                let confirmBtn = document.getElementsByClassName('confirmBtn')[0];
                                //添加商品的信息
                                let addGoodname = document.getElementById('addGoodname');
                                let addGoodbrand = document.getElementById('addGoodbrand');
                                let addGoodimg = document.getElementById('addGoodimg');
                                let addGoodbuy = document.getElementById('addGoodbuy');
                                let addGoodprice = document.getElementById('addGoodprice');
                                let addGoodcolor = document.getElementById('addGoodcolor');
                                addBtn.addEventListener('click', function () {

                                    addBox.style.display = 'block';
                                    backBtn.addEventListener('click', function () {
                                        addBox.style.display = 'none';
                                    })

                                    confirmBtn.addEventListener('click', function () {

                                        ajax({
                                            type: 'POST',
                                            url: 'http://180.76.185.37:3000/addShopData',
                                            data: {
                                                name: addGoodname.value,
                                                brand: addGoodbrand.value,
                                                imageUrl: addGoodimg.value,
                                                sales: addGoodbuy.value,
                                                cost: addGoodprice.value,
                                                color: addGoodcolor.value
                                            },
                                            async: true,
                                            success: function (res) {
                                                res = JSON.parse(res);
                                                console.log(res);
                                                alert(res.message);
                                            }
                                        })
                                    })


                                })

                            }
                        }
                    })

                }
                box.style.height = document.getElementsByClassName('show')[0].offsetHeight + 'px';
                toLogin.innerText = "用户名:" + name;
            }
        }
    })
}

