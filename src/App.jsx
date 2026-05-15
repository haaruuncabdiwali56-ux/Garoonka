import { useState, useEffect } from "react";

const SUPABASE_URL = "https://evabvsfzofeatemywetf.supabase.co";
const SUPABASE_KEY = "sb_publishable_fm9bHlKBljsuoVZgXUMqBg_t53R8BY0";
const H = {"Content-Type":"application/json","apikey":SUPABASE_KEY,"Authorization":`Bearer ${SUPABASE_KEY}`};

const db = {
  async get(table) { const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*`,{headers:H}); return r.json(); },
  async post(table,body) { const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}`,{method:"POST",headers:{...H,"Prefer":"return=representation"},body:JSON.stringify(body)}); return r.json(); },
  async del(table,id) { await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`,{method:"DELETE",headers:H}); },
};

const T={en:{appName:"Garoonka",tagline:"Book Your Stadium in Garoowe",search:"Search stadiums...",sortNearest:"Nearest",sortFurthest:"Furthest",allDistricts:"All Districts",perHour:"/hr",call:"Call",whatsapp:"WhatsApp",schedule:"Schedule",free:"Free",booked:"Booked",bookNow:"Book Now",back:"Back",login:"Login",logout:"Logout",signup:"Sign Up",email:"Email",password:"Password",name:"Full Name",phone:"Phone Number",myBookings:"My Bookings",adminPanel:"Admin Panel",ownerDashboard:"Owner Dashboard",manageSchedule:"Manage Schedule",markFree:"Mark Free",markBooked:"Mark Booked",removeStadium:"Remove",users:"Users",owners:"Owners",stadiums:"Stadiums",noBookings:"No bookings yet.",welcomeBack:"Welcome back",loginError:"Invalid email or password.",languageToggle:"Somali",contactAdmin:"WhatsApp Admin",hours:"Hour",confirmBook:"Confirm booking for",cancel:"Cancel",confirm:"Confirm",bookingSuccess:"Booking confirmed!",artificialTurf:"Artificial Turf",naturalGrass:"Natural Grass",concrete:"Concrete",loading:"Loading stadiums...",addStadium:"Add Stadium",stadiumName:"Stadium Name",district:"District",price:"Price per hour ($)",surface:"Surface"},so:{appName:"Garoonka",tagline:"Ka Buuxi Garoonkaaga Garoowe",search:"Raadi garoon...",sortNearest:"Ugu Dhow",sortFurthest:"Ugu Fog",allDistricts:"Dhammaan Degmooyinka",perHour:"/saac",call:"Wac",whatsapp:"WhatsApp",schedule:"Jadwal",free:"Xor",booked:"Buuxan",bookNow:"Buuxi Hadda",back:"Dib",login:"Gal",logout:"Bax",signup:"Isdiiwaangeliso",email:"Iimaylka",password:"Furaha Sirta",name:"Magaca Buuxa",phone:"Lambarka Telefoonka",myBookings:"Buuxintaydii",adminPanel:"Xarunta Maamulka",ownerDashboard:"Xarunta Mulkiilaha",manageSchedule:"Maaree Jadwalka",markFree:"Calaamadi Xor",markBooked:"Calaamadi Buuxan",removeStadium:"Ka Saar",users:"Isticmaalayaasha",owners:"Mulkiilayaasha",stadiums:"Garoomaanaha",noBookings:"Buuxin ma jirto.",welcomeBack:"Ku soo dhawoow",loginError:"Iimaylka ama furaha sirta waa khalad.",languageToggle:"English",contactAdmin:"WhatsApp Admin",hours:"Saacad",confirmBook:"Xaqiiji buuxinta",cancel:"Jooji",confirm:"Xaqiiji",bookingSuccess:"Buuxintii waa la xaqiijiyay!",artificialTurf:"Caws Macmal ah",naturalGrass:"Caws Dabiici ah",concrete:"Dhagax Dhis",loading:"Waa la raraa...",addStadium:"Ku Dar Garoon",stadiumName:"Magaca Garoonka",district:"Degmada",price:"Qiimaha Saacadda ($)",surface:"Xadhkaha"}};

const HOURS=[];
for(let h=7;h<=24;h++){const label=h===24?"1:00 AM":h<12?`${h}:00 AM`:h===12?"12:00 PM":`${h-12}:00 PM`;HOURS.push({id:h,label});}
const initSched=()=>{const s={};HOURS.forEach(h=>s[h.id]="free");return s;};

const USERS=[
  {id:1,role:"admin",name:"Admin",email:"admin@garoonka.so",password:"admin123",phone:"252905066221"},
  {id:2,role:"owner",name:"Ahmed Hassan",email:"ahmed@garoonka.so",password:"owner123",phone:"252901111111"},
  {id:3,role:"owner",name:"Faisal Omar",email:"faisal@garoonka.so",password:"owner123",phone:"252902222222"},
  {id:4,role:"user",name:"Test User",email:"user@test.com",password:"user123",phone:"252903333333"},
];

const EMOJIS=["⚽","🏟️","🏆","🌟","🎯","🏅"];
const COLORS=[["#1a472a","#2d6a4f"],["#1b4332","#40916c"],["#023e8a","#0077b6"],["#7b2d00","#c84b00"],["#4a0072","#7b1fa2"],["#004d40","#00796b"]];

const css=`
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{--green:#00e676;--green-dark:#00c853;--bg:#0a0a0f;--surface:#12121a;--surface2:#1a1a26;--border:rgba(255,255,255,0.08);--text:#f0f0f8;--muted:#888899;--red:#ff4444;--radius:16px;--font-head:'Bebas Neue',sans-serif;--font-body:'IBM Plex Sans',sans-serif;}
body{background:var(--bg);color:var(--text);font-family:var(--font-body);}
.app{max-width:430px;margin:0 auto;min-height:100vh;position:relative;overflow-x:hidden;}
.header{position:sticky;top:0;z-index:100;background:rgba(10,10,15,0.92);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);padding:12px 20px;display:flex;align-items:center;justify-content:space-between;}
.logo{font-family:var(--font-head);font-size:28px;letter-spacing:2px;color:var(--green);}
.logo span{color:var(--text);}
.header-actions{display:flex;gap:8px;align-items:center;}
.btn-sm{padding:6px 12px;border-radius:8px;border:1px solid var(--border);background:var(--surface2);color:var(--text);font-family:var(--font-body);font-size:12px;cursor:pointer;transition:all 0.2s;}
.btn-sm:hover{border-color:var(--green);color:var(--green);}
.btn-sm.active{background:var(--green);color:#000;border-color:var(--green);font-weight:600;}
.hero{background:linear-gradient(135deg,#0a0a0f 0%,#0d1f12 50%,#0a0a0f 100%);padding:32px 20px 24px;border-bottom:1px solid var(--border);position:relative;overflow:hidden;}
.hero::before{content:'⚽';position:absolute;right:-20px;top:-20px;font-size:120px;opacity:0.04;}
.hero h1{font-family:var(--font-head);font-size:42px;line-height:1;letter-spacing:1px;}
.hero h1 em{color:var(--green);font-style:normal;}
.hero p{color:var(--muted);margin-top:6px;font-size:13px;}
.search-bar{padding:16px 20px 8px;display:flex;gap:10px;align-items:center;}
.search-input{flex:1;background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:10px 14px;color:var(--text);font-family:var(--font-body);font-size:14px;outline:none;transition:border-color 0.2s;}
.search-input:focus{border-color:var(--green);}
.search-input::placeholder{color:var(--muted);}
.filters{padding:8px 20px 16px;display:flex;gap:8px;overflow-x:auto;}
.filters::-webkit-scrollbar{display:none;}
.chip{padding:6px 14px;border-radius:20px;border:1px solid var(--border);background:var(--surface2);color:var(--muted);font-size:12px;cursor:pointer;white-space:nowrap;transition:all 0.2s;font-family:var(--font-body);}
.chip.active{background:var(--green);color:#000;border-color:var(--green);font-weight:600;}
.stadium-list{padding:0 20px 100px;display:flex;flex-direction:column;gap:16px;}
.stadium-card{border-radius:var(--radius);overflow:hidden;border:1px solid var(--border);cursor:pointer;transition:transform 0.2s,border-color 0.2s;background:var(--surface);}
.stadium-card:hover{transform:translateY(-2px);border-color:rgba(0,230,118,0.3);}
.card-banner{height:120px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;}
.card-banner-emoji{font-size:60px;opacity:0.6;}
.card-badge{position:absolute;top:10px;right:10px;background:rgba(0,0,0,0.6);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:4px 10px;font-size:13px;font-weight:600;color:var(--green);}
.card-district{position:absolute;top:10px;left:10px;background:rgba(0,0,0,0.6);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:4px 10px;font-size:11px;color:var(--muted);}
.card-body{padding:14px;}
.card-name{font-family:var(--font-head);font-size:22px;letter-spacing:0.5px;}
.card-meta{display:flex;gap:12px;margin-top:6px;}
.card-meta span{font-size:12px;color:var(--muted);}
.btn{padding:10px 18px;border-radius:10px;border:none;font-family:var(--font-body);font-size:13px;font-weight:600;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:6px;}
.btn-green{background:var(--green);color:#000;}
.btn-green:hover{background:var(--green-dark);}
.btn-outline{background:transparent;border:1px solid var(--border);color:var(--text);}
.btn-outline:hover{border-color:var(--green);color:var(--green);}
.btn-red{background:var(--red);color:#fff;}
.btn-full{width:100%;justify-content:center;}
.detail{padding:0 0 100px;}
.detail-banner{height:200px;display:flex;align-items:center;justify-content:center;position:relative;font-size:100px;}
.detail-info{padding:20px;}
.detail-name{font-family:var(--font-head);font-size:36px;letter-spacing:1px;line-height:1;}
.detail-tags{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;}
.tag{padding:4px 12px;border-radius:20px;background:var(--surface2);border:1px solid var(--border);font-size:12px;color:var(--muted);}
.tag.green{border-color:var(--green);color:var(--green);}
.detail-price{margin-top:16px;padding:16px;background:var(--surface2);border-radius:var(--radius);border:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;}
.detail-price .amount{font-family:var(--font-head);font-size:32px;color:var(--green);}
.detail-actions{display:flex;gap:10px;margin-top:16px;}
.section-title{font-family:var(--font-head);font-size:20px;letter-spacing:1px;margin:24px 0 12px;padding:0 20px;}
.schedule-grid{padding:0 20px;display:flex;flex-direction:column;gap:6px;}
.slot{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-radius:10px;border:1px solid var(--border);background:var(--surface2);transition:all 0.2s;}
.slot.free{border-color:rgba(0,230,118,0.2);}
.slot.booked{background:rgba(255,68,68,0.05);border-color:rgba(255,68,68,0.2);}
.slot-time{font-size:13px;font-weight:500;}
.slot-status{font-size:12px;font-weight:600;padding:3px 10px;border-radius:6px;}
.slot-status.free{background:rgba(0,230,118,0.15);color:var(--green);}
.slot-status.booked{background:rgba(255,68,68,0.15);color:var(--red);}
.auth-screen{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 24px;background:radial-gradient(ellipse at top,#0d1f12 0%,#0a0a0f 60%);}
.auth-logo{font-family:var(--font-head);font-size:52px;letter-spacing:4px;margin-bottom:8px;color:var(--green);}
.auth-sub{color:var(--muted);font-size:14px;margin-bottom:32px;}
.auth-card{width:100%;max-width:380px;background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:28px;}
.auth-title{font-family:var(--font-head);font-size:28px;letter-spacing:1px;margin-bottom:20px;}
.form-group{margin-bottom:14px;}
.form-label{font-size:12px;color:var(--muted);margin-bottom:6px;display:block;}
.form-input{width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:11px 14px;color:var(--text);font-family:var(--font-body);font-size:14px;outline:none;transition:border-color 0.2s;}
.form-input:focus{border-color:var(--green);}
.form-error{color:var(--red);font-size:12px;margin-top:10px;text-align:center;}
.auth-switch{margin-top:16px;text-align:center;font-size:13px;color:var(--muted);}
.auth-switch button{background:none;border:none;color:var(--green);cursor:pointer;font-size:13px;}
.panel{padding:20px 20px 100px;}
.panel-title{font-family:var(--font-head);font-size:32px;letter-spacing:1px;margin-bottom:20px;}
.tab-row{display:flex;gap:8px;margin-bottom:20px;}
.tab{padding:8px 16px;border-radius:10px;border:1px solid var(--border);background:var(--surface2);color:var(--muted);font-size:13px;cursor:pointer;font-family:var(--font-body);transition:all 0.2s;}
.tab.active{background:var(--green);color:#000;border-color:var(--green);font-weight:600;}
.list-item{background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:14px;margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;}
.list-item-info{flex:1;}
.list-item-name{font-weight:600;font-size:14px;}
.list-item-sub{font-size:12px;color:var(--muted);margin-top:2px;}
.role-badge{font-size:11px;padding:2px 8px;border-radius:5px;font-weight:600;margin-left:8px;}
.role-owner{background:rgba(0,230,118,0.15);color:var(--green);}
.role-user{background:rgba(136,136,153,0.15);color:var(--muted);}
.bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;background:rgba(10,10,15,0.95);backdrop-filter:blur(20px);border-top:1px solid var(--border);display:flex;padding:10px 0 20px;z-index:100;}
.nav-item{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;transition:color 0.2s;color:var(--muted);border:none;background:none;font-family:var(--font-body);}
.nav-item.active{color:var(--green);}
.nav-icon{font-size:20px;}
.nav-label{font-size:10px;font-weight:500;}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:flex-end;z-index:200;backdrop-filter:blur(4px);}
.modal{width:100%;max-width:430px;margin:0 auto;background:var(--surface);border-radius:20px 20px 0 0;padding:24px;border-top:1px solid var(--border);animation:slideUp 0.3s ease;}
@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
.modal-title{font-family:var(--font-head);font-size:24px;letter-spacing:1px;margin-bottom:8px;}
.modal-sub{color:var(--muted);font-size:13px;margin-bottom:20px;}
.modal-actions{display:flex;gap:10px;margin-top:20px;}
.toast{position:fixed;top:80px;left:50%;transform:translateX(-50%);background:var(--green);color:#000;font-weight:600;padding:12px 24px;border-radius:12px;font-size:14px;z-index:300;animation:toastIn 0.3s ease;white-space:nowrap;}
@keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(-10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
.booking-card{background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:12px;}
.booking-stadium{font-family:var(--font-head);font-size:20px;}
.booking-detail{font-size:13px;color:var(--muted);margin-top:4px;}
.booking-status{display:inline-block;margin-top:8px;padding:3px 10px;border-radius:6px;font-size:12px;font-weight:600;background:rgba(0,230,118,0.15);color:var(--green);}
.empty-state{text-align:center;padding:60px 20px;color:var(--muted);}
.empty-state .es-icon{font-size:48px;margin-bottom:12px;}
.empty-state p{font-size:14px;}
.loading-screen{min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--muted);}
.spinner{width:40px;height:40px;border:3px solid var(--border);border-top-color:var(--green);border-radius:50%;animation:spin 0.8s linear infinite;margin-bottom:16px;}
@keyframes spin{to{transform:rotate(360deg)}}
::-webkit-scrollbar{width:4px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:var(--border);border-radius:4px;}
`;

export default function App() {
  const [lang,setLang]=useState("en");
  const t=T[lang];
  const [stadiums,setStadiums]=useState([]);
  const [users]=useState(USERS);
  const [currentUser,setCurrentUser]=useState(()=>{
  try{const u=localStorage.getItem("garoonka_user");return u?JSON.parse(u):null;}
  catch{return null;}
});
  const [bookings,setBookings]=useState([]);
  const [screen,setScreen]=useState("home");
  const [selectedStadium,setSelectedStadium]=useState(null);
  const [authMode,setAuthMode]=useState("login");
  const [search,setSearch]=useState("");
  const [sortMode,setSortMode]=useState("none");
  const [filterDistrict,setFilterDistrict]=useState("all");
  const [bookingSlot,setBookingSlot]=useState(null);
  const [toast,setToast]=useState(null);
  const [adminTab,setAdminTab]=useState("stadiums");
  const [loading,setLoading]=useState(true);
  const [showAddForm,setShowAddForm]=useState(false);
  const [newStadium,setNewStadium]=useState({name:"",district:"",price:"",surface:"artificialTurf",phone:"252905066221"});

  useEffect(()=>{
    db.get("stadiums").then(data=>{
      if(data&&Array.isArray(data)&&data.length>0){
        setStadiums(data.map((s,i)=>({
          ...s,
          colors:[s.color1||COLORS[i%COLORS.length][0],s.color2||COLORS[i%COLORS.length][1]],
          schedule:initSched(),
          emoji:s.emoji||EMOJIS[i%EMOJIS.length],
          ownerId:s.owner_id||2,
        })));
      }
      setLoading(false);
    }).catch(()=>setLoading(false));
    db.get("bookings").then(data=>{
      if(data&&Array.isArray(data))setBookings(data);
    }).catch(()=>{});
  },[]);

  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(null),2500);};
  const districts=["all",...new Set(stadiums.map(s=>s.district))];
  const filtered=stadiums
    .filter(s=>s.name.toLowerCase().includes(search.toLowerCase())||s.district.toLowerCase().includes(search.toLowerCase()))
    .filter(s=>filterDistrict==="all"||s.district===filterDistrict)
    .sort((a,b)=>sortMode==="nearest"?a.price-b.price:sortMode==="furthest"?b.price-a.price:0);

  const openStadium=s=>{setSelectedStadium(s);setScreen("detail");};

const handleLogin=(email,password)=>{
    const u=users.find(u=>u.email===email&&u.password===password);
    if(u){setCurrentUser(u);localStorage.setItem("garoonka_user",JSON.stringify(u));setScreen("home");showToast(`${t.welcomeBack}, ${u.name.split(" ")[0]}!`);return true;}
    return false;
  };
  const handleSignup=(name,email,password,phone)=>{
    const u={id:users.length+1,role:"user",name,email,password,phone};
  setCurrentUser(null);localStorage.removeItem("garoonka_user");setScreen("home");

  const handleBookSlot=(stadiumId,hourId)=>{
    const s=stadiums.find(s=>s.id===stadiumId);
    const h=HOURS.find(h=>h.id===hourId);
    setBookingSlot({stadiumId,hourId,stadiumName:s.name,hourLabel:h.label});
  };

  const confirmBooking=()=>{
    if(!currentUser){setScreen("auth");setBookingSlot(null);return;}
    const booking={stadium_id:bookingSlot.stadiumId,user_name:currentUser.name,user_phone:currentUser.phone,hour_label:bookingSlot.hourLabel,booked_date:new Date().toLocaleDateString()};
    db.post("bookings",booking).catch(()=>{});
    setStadiums(prev=>prev.map(s=>s.id===bookingSlot.stadiumId?{...s,schedule:{...s.schedule,[bookingSlot.hourId]:"booked"}}:s));
    setBookings(prev=>[...prev,{...booking,id:Date.now(),userId:currentUser.id}]);
    setSelectedStadium(prev=>prev?{...prev,schedule:{...prev.schedule,[bookingSlot.hourId]:"booked"}}:prev);
    setBookingSlot(null);showToast(t.bookingSuccess);
  };

  const toggleSlot=(stadiumId,hourId)=>{
    const ns=stadiums.find(s=>s.id===stadiumId)?.schedule[hourId]==="free"?"booked":"free";
    setStadiums(prev=>prev.map(s=>s.id===stadiumId?{...s,schedule:{...s.schedule,[hourId]:ns}}:s));
    if(selectedStadium?.id===stadiumId)setSelectedStadium(prev=>({...prev,schedule:{...prev.schedule,[hourId]:ns}}));
  };

  const removeStadium=id=>{
    db.del("stadiums",id).catch(()=>{});
    setStadiums(prev=>prev.filter(s=>s.id!==id));
    showToast("Stadium removed!");
  };

  const addStadium=()=>{
    if(!newStadium.name||!newStadium.district||!newStadium.price)return;
    const idx=stadiums.length%COLORS.length;
    const s={name:newStadium.name,district:newStadium.district,price:parseInt(newStadium.price),surface:newStadium.surface,phone:newStadium.phone,emoji:EMOJIS[idx],color1:COLORS[idx][0],color2:COLORS[idx][1],owner_id:2};
    db.post("stadiums",s).then(data=>{
      const created=Array.isArray(data)?data[0]:data;
      setStadiums(prev=>[...prev,{...created,colors:[s.color1,s.color2],schedule:initSched(),ownerId:2}]);
    }).catch(()=>{});
    setShowAddForm(false);
    setNewStadium({name:"",district:"",price:"",surface:"artificialTurf",phone:"252905066221"});
    showToast("Stadium added!");
  };

  const whatsapp=phone=>window.open(`https://wa.me/${phone}`,"_blank");
  const call=phone=>window.open(`tel:+${phone}`,"_self");
  const myStadiums=currentUser?.role==="owner"?stadiums.filter(s=>s.ownerId===currentUser.id):[];

  return(
    <>
      <style>{css}</style>
      <div className="app">
        {toast&&<div className="toast">{toast}</div>}

        {screen==="auth"&&<AuthScreen t={t} mode={authMode} setMode={setAuthMode} onLogin={handleLogin} onSignup={handleSignup} onBack={()=>setScreen("home")}/>}

        {screen!=="auth"&&<>
          <div className="header">
            <div className="logo">GAROON<span>KA</span></div>
            <div className="header-actions">
              <button className="btn-sm" onClick={()=>setLang(lang==="en"?"so":"en")}>{t.languageToggle}</button>
              {currentUser
                ?<button className="btn-sm active" onClick={()=>{setCurrentUser(null);setScreen("home");}}>{t.logout}</button>
                :<button className="btn-sm" onClick={()=>setScreen("auth")}>{t.login}</button>}
            </div>
          </div>

          {screen==="home"&&<div>
            <div className="hero"><h1>{t.appName}<br/><em>{lang==="en"?"GAROOWE":"GAROOYE"}</em></h1><p>{t.tagline}</p></div>
            <div className="search-bar"><input className="search-input" placeholder={t.search} value={search} onChange={e=>setSearch(e.target.value)}/></div>
            <div className="filters">
              {districts.map(d=><button key={d} className={`chip${filterDistrict===d?" active":""}`} onClick={()=>setFilterDistrict(d)}>{d==="all"?t.allDistricts:d}</button>)}
              <button className={`chip${sortMode==="nearest"?" active":""}`} onClick={()=>setSortMode(sortMode==="nearest"?"none":"nearest")}>↓ {t.sortNearest}</button>
              <button className={`chip${sortMode==="furthest"?" active":""}`} onClick={()=>setSortMode(sortMode==="furthest"?"none":"furthest")}>↑ {t.sortFurthest}</button>
            </div>
            {loading
              ?<div className="loading-screen"><div className="spinner"/><p>{t.loading}</p></div>
              :<div className="stadium-list">
                {filtered.length===0&&<div className="empty-state"><div className="es-icon">🔍</div><p>No stadiums found</p></div>}
                {filtered.map(s=>{
                  const fc=Object.values(s.schedule).filter(v=>v==="free").length;
                  return<div key={s.id} className="stadium-card" onClick={()=>openStadium(s)}>
                    <div className="card-banner" style={{background:`linear-gradient(135deg,${s.colors[0]},${s.colors[1]})`}}>
                      <span className="card-banner-emoji">{s.emoji}</span>
                      <span className="card-badge">${s.price}{t.perHour}</span>
                      <span className="card-district">{s.district}</span>
                    </div>
                    <div className="card-body">
                      <div className="card-name">{s.name}</div>
                      <div className="card-meta"><span>🟢 {fc} {t.free}</span><span>🔒 {HOURS.length-fc} {t.booked}</span><span>⛳ {t[s.surface]}</span></div>
                    </div>
                  </div>;
                })}
              </div>}
          </div>}

          {screen==="detail"&&selectedStadium&&(()=>{
            const isOwner=currentUser?.role==="owner"&&currentUser.id===selectedStadium.ownerId;
            const isAdmin=currentUser?.role==="admin";
            return<div className="detail">
              <div className="detail-banner" style={{background:`linear-gradient(135deg,${selectedStadium.colors[0]},${selectedStadium.colors[1]})`}}>
                <span>{selectedStadium.emoji}</span>
                <button onClick={()=>setScreen("home")} style={{position:"absolute",top:16,left:16,background:"rgba(0,0,0,0.5)",border:"none",color:"#fff",borderRadius:10,padding:"8px 14px",cursor:"pointer",fontSize:13,fontFamily:"var(--font-body)"}}>← {t.back}</button>
              </div>
              <div className="detail-info">
                <div className="detail-name">{selectedStadium.name}</div>
                <div className="detail-tags">
                  <span className="tag">📍 {selectedStadium.district}</span>
                  <span className="tag">⛳ {t[selectedStadium.surface]}</span>
                  <span className="tag green">🟢 {Object.values(selectedStadium.schedule).filter(v=>v==="free").length} {t.free}</span>
                </div>
                <div className="detail-price">
                  <div><div style={{fontSize:12,color:"var(--muted)"}}>{t.price}</div><div className="amount">${selectedStadium.price}<span style={{fontSize:14,color:"var(--muted)"}}>{t.perHour}</span></div></div>
                  <div style={{fontSize:28}}>{selectedStadium.emoji}</div>
                </div>
                <div className="detail-actions">
                  <button className="btn btn-outline" style={{flex:1}} onClick={()=>call(selectedStadium.phone)}>📞 {t.call}</button>
                  <button className="btn btn-green" style={{flex:1}} onClick={()=>whatsapp(selectedStadium.phone)}>💬 {t.whatsapp}</button>
                </div>
                <button className="btn btn-outline btn-full" style={{marginTop:8}} onClick={()=>whatsapp("252905066221")}>{t.contactAdmin}</button>
              </div>
              <div className="section-title">🕐 {t.schedule}</div>
              <div className="schedule-grid">
                {HOURS.map(h=>{
                  const status=selectedStadium.schedule[h.id];
                  return<div key={h.id} className={`slot ${status}`}>
                    <span className="slot-time">{h.label}</span>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span className={`slot-status ${status}`}>{status==="free"?t.free:t.booked}</span>
                      {(isOwner||isAdmin)
                        ?<button className={`btn ${status==="free"?"btn-red":"btn-green"}`} style={{padding:"4px 10px",fontSize:11}} onClick={()=>toggleSlot(selectedStadium.id,h.id)}>{status==="free"?t.markBooked:t.markFree}</button>
                        :status==="free"&&<button className="btn btn-green" style={{padding:"4px 10px",fontSize:11}} onClick={()=>handleBookSlot(selectedStadium.id,h.id)}>{t.bookNow}</button>}
                    </div>
                  </div>;
                })}
              </div>
            </div>;
          })()}

          {screen==="bookings"&&<div className="panel">
            <div className="panel-title">📋 {t.myBookings}</div>
            {bookings.filter(b=>b.userId===currentUser?.id||b.user_name===currentUser?.name).length===0
              ?<div className="empty-state"><div className="es-icon">📋</div><p>{t.noBookings}</p></div>
              :bookings.filter(b=>b.userId===currentUser?.id||b.user_name===currentUser?.name).map((b,i)=>(
                <div key={i} className="booking-card">
                  <div className="booking-stadium">{b.stadiumName||b.stadium_id}</div>
                  <div className="booking-detail">🕐 {b.hour||b.hour_label} · 📅 {b.date||b.booked_date}</div>
                  <span className="booking-status">✓ {t.booked}</span>
                </div>
              ))}
          </div>}

          {screen==="admin"&&currentUser?.role==="admin"&&<div className="panel">
            <div className="panel-title">⚙️ {t.adminPanel}</div>
            <div className="tab-row">
              <button className={`tab${adminTab==="stadiums"?" active":""}`} onClick={()=>setAdminTab("stadiums")}>🏟️ {t.stadiums}</button>
              <button className={`tab${adminTab==="users"?" active":""}`} onClick={()=>setAdminTab("users")}>👤 {t.users}</button>
              <button className={`tab${adminTab==="bookings"?" active":""}`} onClick={()=>setAdminTab("bookings")}>📋 {t.myBookings}</button>
            </div>
            {adminTab==="stadiums"&&<>
              <button className="btn btn-green btn-full" style={{marginBottom:16}} onClick={()=>setShowAddForm(!showAddForm)}>➕ {t.addStadium}</button>
              {showAddForm&&<div style={{background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:16,padding:16,marginBottom:16}}>
                <div className="form-group"><label className="form-label">{t.stadiumName}</label><input className="form-input" value={newStadium.name} onChange={e=>setNewStadium({...newStadium,name:e.target.value})} placeholder="Horseed Stadium"/></div>
                <div className="form-group"><label className="form-label">{t.district}</label><input className="form-input" value={newStadium.district} onChange={e=>setNewStadium({...newStadium,district:e.target.value})} placeholder="Hoose"/></div>
                <div className="form-group"><label className="form-label">{t.price}</label><input className="form-input" type="number" value={newStadium.price} onChange={e=>setNewStadium({...newStadium,price:e.target.value})} placeholder="50"/></div>
                <div className="form-group"><label className="form-label">{t.surface}</label>
                  <select className="form-input" value={newStadium.surface} onChange={e=>setNewStadium({...newStadium,surface:e.target.value})}>
                    <option value="artificialTurf">{t.artificialTurf}</option>
                    <option value="naturalGrass">{t.naturalGrass}</option>
                    <option value="concrete">{t.concrete}</option>
                  </select>
                </div>
                <div className="form-group"><label className="form-label">{t.phone}</label><input className="form-input" value={newStadium.phone} onChange={e=>setNewStadium({...newStadium,phone:e.target.value})} placeholder="252901234567"/></div>
                <div style={{display:"flex",gap:8}}>
                  <button className="btn btn-outline" style={{flex:1}} onClick={()=>setShowAddForm(false)}>{t.cancel}</button>
                  <button className="btn btn-green" style={{flex:1}} onClick={addStadium}>{t.confirm}</button>
                </div>
              </div>}
              {stadiums.map(s=><div key={s.id} className="list-item">
                <div className="list-item-info"><div className="list-item-name">{s.emoji} {s.name}</div><div className="list-item-sub">📍 {s.district} · ${s.price}/hr</div></div>
                <div style={{display:"flex",gap:8}}>
                  <button className="btn btn-outline" style={{padding:"6px 12px",fontSize:12}} onClick={()=>openStadium(s)}>View</button>
                  <button className="btn btn-red" style={{padding:"6px 12px",fontSize:12}} onClick={()=>removeStadium(s.id)}>{t.removeStadium}</button>
                </div>
              </div>)}
            </>}
            {adminTab==="users"&&users.filter(u=>u.role==="user").map(u=><div key={u.id} className="list-item">
              <div className="list-item-info"><div className="list-item-name">{u.name} <span className="role-badge role-user">user</span></div><div className="list-item-sub">{u.email} · {u.phone}</div></div>
            </div>)}
            {adminTab==="bookings"&&(bookings.length===0
              ?<div className="empty-state"><div className="es-icon">📋</div><p>{t.noBookings}</p></div>
              :bookings.map((b,i)=><div key={i} className="booking-card">
                <div className="booking-stadium">{b.stadiumName||`Stadium #${b.stadium_id}`}</div>
                <div className="booking-detail">👤 {b.user_name} · 🕐 {b.hour_label} · 📅 {b.booked_date}</div>
                <span className="booking-status">✓ {t.booked}</span>
              </div>)
            )}
          </div>}

          {screen==="owner"&&currentUser?.role==="owner"&&<div className="panel">
            <div className="panel-title">🏆 {t.ownerDashboard}</div>
            {myStadiums.length===0
              ?<div className="empty-state"><div className="es-icon">🏟️</div><p>No stadiums assigned.</p></div>
              :myStadiums.map(s=>{
                const fc=Object.values(s.schedule).filter(v=>v==="free").length;
                return<div key={s.id} className="list-item" style={{flexDirection:"column",alignItems:"flex-start",gap:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",width:"100%",alignItems:"center"}}>
                    <div><div className="list-item-name">{s.emoji} {s.name}</div><div className="list-item-sub">📍 {s.district} · ${s.price}/hr</div></div>
                    <button className="btn btn-green" style={{padding:"8px 14px",fontSize:12}} onClick={()=>openStadium(s)}>{t.manageSchedule}</button>
                  </div>
                  <div style={{display:"flex",gap:16,fontSize:13}}>
                    <span style={{color:"var(--green)"}}>🟢 {fc} {t.free}</span>
                    <span style={{color:"var(--red)"}}>🔒 {HOURS.length-fc} {t.booked}</span>
                  </div>
                </div>;
              })}
          </div>}

          <nav className="bottom-nav">
            <button className={`nav-item${screen==="home"?" active":""}`} onClick={()=>setScreen("home")}><span className="nav-icon">🏟️</span><span className="nav-label">{t.stadiums}</span></button>
            {currentUser&&<button className={`nav-item${screen==="bookings"?" active":""}`} onClick={()=>setScreen("bookings")}><span className="nav-icon">📋</span><span className="nav-label">{t.myBookings}</span></button>}
            {currentUser?.role==="admin"&&<button className={`nav-item${screen==="admin"?" active":""}`} onClick={()=>setScreen("admin")}><span className="nav-icon">⚙️</span><span className="nav-label">{t.adminPanel}</span></button>}
            {currentUser?.role==="owner"&&<button className={`nav-item${screen==="owner"?" active":""}`} onClick={()=>setScreen("owner")}><span className="nav-icon">🏆</span><span className="nav-label">{t.ownerDashboard}</span></button>}
            {!currentUser&&<button className="nav-item" onClick={()=>setScreen("auth")}><span className="nav-icon">👤</span><span className="nav-label">{t.login}</span></button>}
          </nav>
        </>}

        {bookingSlot&&<div className="modal-overlay" onClick={()=>setBookingSlot(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-title">⚽ {t.bookNow}</div>
            <div className="modal-sub">{t.confirmBook} {bookingSlot.stadiumName}</div>
            <div style={{background:"var(--surface2)",borderRadius:12,padding:"14px 16px",border:"1px solid var(--border)"}}>
              <div style={{fontSize:13,color:"var(--muted)"}}>{t.hours}</div>
              <div style={{fontFamily:"var(--font-head)",fontSize:24,color:"var(--green)",marginTop:4}}>{bookingSlot.hourLabel}</div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline" style={{flex:1}} onClick={()=>setBookingSlot(null)}>{t.cancel}</button>
              <button className="btn btn-green" style={{flex:1}} onClick={confirmBooking}>{t.confirm}</button>
            </div>
          </div>
        </div>}
      </div>
    </>
  );
}

function AuthScreen({t,mode,setMode,onLogin,onSignup,onBack}){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [name,setName]=useState("");
  const [phone,setPhone]=useState("");
  const [error,setError]=useState("");
  const submit=()=>{
    if(mode==="login"){const ok=onLogin(email,password);if(!ok)setError(t.loginError);}
    else{if(!name||!email||!password){setError("Please fill all fields.");return;}onSignup(name,email,password,phone);}
  };
  return<div className="auth-screen">
    <div className="auth-logo">GAROONKA</div>
    <div className="auth-sub">{t.tagline}</div>
    <div className="auth-card">
      <div className="auth-title">{mode==="login"?t.login:t.signup}</div>
      {mode==="signup"&&<>
        <div className="form-group"><label className="form-label">{t.name}</label><input className="form-input" value={name} onChange={e=>setName(e.target.value)} placeholder="Mohamed Ali"/></div>
        <div className="form-group"><label className="form-label">{t.phone}</label><input className="form-input" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="252901234567"/></div>
      </>}
      <div className="form-group"><label className="form-label">{t.email}</label><input className="form-input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="email@example.com"/></div>
      <div className="form-group"><label className="form-label">{t.password}</label><input className="form-input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••"/></div>
      {error&&<div className="form-error">{error}</div>}
      <button className="btn btn-green btn-full" style={{marginTop:16}} onClick={submit}>{mode==="login"?t.login:t.signup}</button>
      <div className="auth-switch">
        {mode==="login"?<button onClick={()=>{setMode("signup");setError("");}}>→ {t.signup}</button>:<button onClick={()=>{setMode("login");setError("");}}>← {t.login}</button>}
      </div>
      <div className="auth-switch" style={{marginTop:8}}><button onClick={onBack} style={{color:"var(--muted)"}}>← Back to stadiums</button></div>
    </div>
    <div style={{marginTop:20,fontSize:12,color:"var(--muted)",textAlign:"center"}}>Demo: admin@garoonka.so / admin123</div>
  </div>;
}
