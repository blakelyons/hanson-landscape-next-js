// Blog posts migrated from the legacy WordPress site (hansonlandscape.com, 2013-2017).
// Generated once from the WP REST API; edit freely. Paragraph/heading/list `html` is
// first-party content limited to <a>, <strong>, <em>, <sup>, <br> (rendered with
// dangerouslySetInnerHTML in components/blog/post-body.tsx). Images live in
// public/images/blog/{slug}/. Legacy duplicate/shadowed posts are redirected in next.config.ts.

export type BlogBlock =
    | { type: "paragraph"; html: string }
    | { type: "heading"; html: string }
    | { type: "list"; items: string[] }
    | { type: "image"; src: string; width: number; height: number; alt: string };

export type BlogPost = {
    slug: string;
    title: string;
    /** ISO date (YYYY-MM-DD) */
    date: string;
    excerpt: string;
    blocks: BlogBlock[];
};

export const BLOG_POSTS: BlogPost[] = [
    {
        slug: "project-armor-up",
        title: "PROJECT ARMOR UP",
        date: "2017-09-13",
        excerpt:
            "Hanson Landscape and Global Power & Construction hosted a 2013 fundraiser that restored and outfitted armored vehicles for the Kane County SWAT team.",
        blocks: [
            {
                type: "paragraph",
                html: "Our results of the 2013 “PROJECT ARMOR UP”",
            },
            {
                type: "paragraph",
                html: "Hanson Landscape and Global Power &amp; Construction  hosted a fundraiser in 2013 for the Kane County SWAT TEAM.",
            },
            {
                type: "paragraph",
                html: "These are the Armored Vehicles that the money we raised was able to restore and outfit for the SWAT TEAM.",
            },
            {
                type: "paragraph",
                html: "Thanks again to all who participated with us on the wonderful event.",
            },
            {
                type: "image",
                src: "/images/blog/project-armor-up/42709.jpeg",
                width: 1882,
                height: 1412,
                alt: "",
            },
            {
                type: "image",
                src: "/images/blog/project-armor-up/42706.jpeg",
                width: 1796,
                height: 1347,
                alt: "",
            },
            {
                type: "image",
                src: "/images/blog/project-armor-up/42703.jpeg",
                width: 1529,
                height: 2039,
                alt: "",
            },
            {
                type: "image",
                src: "/images/blog/project-armor-up/42700.jpeg",
                width: 1736,
                height: 2315,
                alt: "",
            },
            {
                type: "image",
                src: "/images/blog/project-armor-up/42697.jpeg",
                width: 1837,
                height: 1378,
                alt: "",
            },
        ],
    },
    {
        slug: "choose-landscaper",
        title: "How to Choose a Landscaper",
        date: "2014-01-24",
        excerpt:
            "It is no question that having an appealing landscaping design adds value to any property as well as draws attention.",
        blocks: [
            {
                type: "heading",
                html: "How to Choose a Landscaper",
            },
            {
                type: "paragraph",
                html: "It is no question that having an appealing landscaping design adds value to any property as well as draws attention. Whether it is a landscape design project such as a garden, patio, water features or if it is simply hiring a company to take care of landscape maintenance, hiring the correct landscaping company is an absolute must. Due to the positive or negative effects that any landscaping project can have on the value of a property, finding a trusted and reliable landscaping company is ideal. In any situation that involves choosing a landscaping company, there are a few simple steps that can help you find the correct choice for your needs. Below is an overview of how to choose a landscaper.",
            },
            {
                type: "paragraph",
                html: "<strong>1. Research a number of companies.</strong>",
            },
            {
                type: "paragraph",
                html: "There is no doubting that there will be numerous landscaping companies in your area. However, there are certain researching techniques that separate the good from the bad. One obvious area in which to look is through the internet. There are many options through which to research a company on the internet whether you are looking for ratings of the company or general information on the company. Here are some general steps to follow when researching a company on the internet.",
            },
            {
                type: "list",
                items: [
                    "Visit the “About Us” or a page similar to this to learn about the owners of the company as well as gain some background of the company",
                    "Find out how many years the company has been in business, languages they offer, contact information and times to reach them",
                    "Find what associations or affiliations the company has, such as the Better Business Bureau, PLANET, or other associations",
                    "Look for certifications and whether or not they are insured",
                    "If they have a portfolio, go through it and look for the type of work you want performed",
                ],
            },
            {
                type: "paragraph",
                html: "In addition to researching a company online, there are other ways in which to research a company. One excellent way is through referrals and ratings. If you are aware of anybody who has had work done through a company, a referral through that person is a great reference point. Seek out multiple referrals to get a full overview of the company and the work they perform. Online ratings and reviews are also a quick and effective way to view opinions on some of the work a landscaping company has done. A few good sites to look for these ratings and reviews are Google, Yelp, Facebook or other social media sites.",
            },
            {
                type: "paragraph",
                html: "<strong>2. Know your budget and services needed.</strong>",
            },
            {
                type: "paragraph",
                html: "What types of services are you looking for? There is a big difference between needing some residential landscape work done as opposed to signing a contract for landscape maintenance in a commercial setting. It is reasoning like this that proves that you need to know what you want done and why you want it done. Along with this information, you should also know a general budget that you wish to follow. It is likely that the estimates you receive will be higher than what you expect, so having a range of values helps in selecting the correct landscaping company.",
            },
            {
                type: "paragraph",
                html: "<strong>3. Know the timeline of work and be involved.</strong>",
            },
            {
                type: "paragraph",
                html: "Depending on the services you choose, the time that a landscaping company will take to complete a project varies. It will take a company much longer to complete services such as a water feature or lighting features than it will to simply put some pavers in. In either case of hiring a landscaper for a landscape design project or a landscape maintenance contract, you should be involved in the work that the company is performing. Keeping up to date with the work the company is performing and making sure the work is done the way you want it to look is essential.",
            },
            {
                type: "paragraph",
                html: "In any case, choosing a landscaper that fits your needs is an absolutely important step for any landscaping project you may have. We hope these steps help you in figuring out how to choose a landscaper for you next project!",
            },
        ],
    },
    {
        slug: "winter-storms",
        title: "Winter Storms",
        date: "2014-01-08",
        excerpt:
            "Needless to say, it has been a crazy winter for Hanson Landscape and the entire state of Illinois as we look forward in 2014.",
        blocks: [
            {
                type: "paragraph",
                html: 'Needless to say, it has been a crazy winter for Hanson Landscape and the entire state of Illinois as we look forward in 2014. Our plows and salters have been running on what seems to be a non-stop schedule as the snow and ice keep coming in. After Monday and Tuesday’s extreme chill, we decided to do some research on the winter storms and temperatures we have seen this winter thus far. According to the <a href="http://blog.chicagoweathercenter.com/" target="_blank" rel="noopener noreferrer">Chicago Weather Center Blog</a>, Chicagoland has already had 11 sub-zero temperature days. This number of sub-zero days has only been passed in 4 of the past 143 years (we assume this is the time frame in which they began recording temperatures in Chicagoland).',
            },
            {
                type: "paragraph",
                html: "Additionally, the opening 8 days of January have been the ninth coldest since 1871 with an average reading of 7.8 degrees. With all of this cold and snow coming through, we encourage everybody to keep warm and stay indoors if possible. There is still much more snow to come and we look forward to helping our customers have a safe winter. Stay warm, be safe, and keep watching for updates on winter storms!",
            },
        ],
    },
    {
        slug: "hanson-landscape-named-landscaper-year-finalist",
        title: "Hanson Landscape Named Landscaper of the Year Finalist",
        date: "2013-12-04",
        excerpt:
            "Total Landscape Care named Dustin Hanson, owner of Hanson Landscape in Big Rock, Illinois, a 2014 Landscaper of the Year finalist.",
        blocks: [
            {
                type: "paragraph",
                html: '<em><a href="http://www.totallandscapecare.com/landscaper-of-the-year/" target="_blank" rel="noopener noreferrer"></a>Total Landscape Care</em> named Dustin Hanson, owner of Hanson Landscape in Big Rock, Illinois, a 2014 Landscaper of the Year finalist. Presented by Case Construction Equipment, this annual program recognizes the 12 best landscapers from across the country.',
            },
            {
                type: "paragraph",
                html: "The finalists and their guests enjoyed an all-expense-paid cruise to the Bahamas Nov. 15-18, and each landscaper will be featured in an issue of <em>Total Landscape Care</em> magazine in 2014.",
            },
            {
                type: "paragraph",
                html: "Hanson’s projects range from design/build and maintenance to irrigation and erosion control. With his two partners, Brandon Hanson and Ryan Kovarik, Hanson has created what he calls “The Perfect Storm.” The company has grown to have landscaping, construction, property management and biohazard divisions. Beyond the daily grind, Hanson Landscape invests time and commitment to its community and hosts fundraisers, like one they did this year for the SWAT team.",
            },
            {
                type: "paragraph",
                html: "“Even during the economic downturn, the business has seen growth,” says Lauren Heartsill Dowdle, editor-at-large of <em>TLC</em>. “This comes in part because of Dustin’s honest work ethic and high-quality projects.”",
            },
            {
                type: "paragraph",
                html: "The finalists are selected for their impressive portfolios, business techniques, community involvement, safety records and for what sets them apart from others in the industry.",
            },
            {
                type: "paragraph",
                html: "About <em>Total Landscape Care</em>:",
            },
            {
                type: "paragraph",
                html: '<em>Total Landscape Care</em> brings professional landscapers the news and information they need to run successful businesses through monthly magazines, daily newsletters, web articles, social media and videos. For more information, visit <a href="http://totallandscapecare.com" target="_blank" rel="noopener noreferrer"><em>totallandscapecare.com</em></a>. To apply to be Landscaper of the Year, visit <a href="http://totallandscapecare.com/loy" target="_blank" rel="noopener noreferrer"><em>totallandscapecare.com/loy</em></a>.',
            },
        ],
    },
    {
        slug: "included-snow-removal-services",
        title: "What is Included in Snow Removal Services?",
        date: "2013-11-13",
        excerpt: "One of the main services that Hanson Landscape offers is snow removal and ice management.",
        blocks: [
            {
                type: "paragraph",
                html: 'One of the main services that Hanson Landscape offers is <a href="/snow-and-ice-management">snow removal</a> and ice management. While it is obvious through the title of those services what types of options are available, we would like it well-known all of the services that we offer in this area. With the unpredictable and sometimes harsh winters that are <a href="/blog/chicago-snowfall-numbers">seen in the Chicago area</a>, it is only fitting that our customers know what they are getting from our snow and ice removal services. Hanson Landscape currently offers snow removal services, sidewalk shoveling, surface salting, and when necessary we offer hauling of snow.',
            },
            {
                type: "paragraph",
                html: "Through this process, we work around the clock to ensure that our customers are completely satisfied with our snow removal services. We strive to remove the snow and ice in a timely manner to ensure that our customers are free to safely venture into or away from their homes or places of business no matter how bad the forecast may be. We know how harsh and unpredictable the Chicago winters can be and we make every effort to keep all customers on schedule no matter the weather.",
            },
            {
                type: "paragraph",
                html: 'If you are interested in our snow removal services and would like a quote, be sure to <a href="/contact">contact us</a> today so we can make sure you have a safe winter. You can also call us at (630)-556-4120.',
            },
        ],
    },
    {
        slug: "chicago-snowfall-numbers",
        title: "Chicago Snowfall Numbers",
        date: "2013-10-14",
        excerpt:
            "To go along with our recent postings for snow removal this winter, it would be good to give some insight towards the typical Chicago snowfall numbers.",
        blocks: [
            {
                type: "paragraph",
                html: "To go along with our recent postings for snow removal this winter, it would be good to give some insight towards the typical Chicago snowfall numbers. According to the National Weather Service, the last few winters have had snowfall amounts as follows:",
            },
            {
                type: "paragraph",
                html: "2007-2008    60.3″",
            },
            {
                type: "paragraph",
                html: "2008-2009    52.7″",
            },
            {
                type: "paragraph",
                html: "2009-2010    54.2″",
            },
            {
                type: "paragraph",
                html: "2010-2011     57.9″",
            },
            {
                type: "paragraph",
                html: "2011-2012     19.8″",
            },
            {
                type: "paragraph",
                html: "Besides the irregular snowfall of last winter, it is clear to see that Chicago and the surrounding area tends to have snowfall amounts near the 55″ number. Going further into the topic, assuming that Chicago doesn’t have another irregular winter, the Chicago snowfall numbers this winter  should look more like the previous years. This winter, Chicago is part of the weak El Nino which generates a chill towards the north. This also allows for moisture which fuels winter storms. That being said, we are looking forward to a great winter with our snow and ice removal services! If you have any needs, give us a call or email today.",
            },
        ],
    },
    {
        slug: "september-landscape-checklist",
        title: "September Landscape Checklist",
        date: "2013-09-20",
        excerpt:
            "Although it may be a bit late, here is the September landscape checklist brought to you by Autumn Tree.",
        blocks: [
            {
                type: "paragraph",
                html: "Although it may be a bit late, here is the September landscape checklist brought to you by Autumn Tree. As usual, September can be an unpredictable month in terms of weather which makes landscaping quite tricky, so here are the tips for this month.",
            },
            {
                type: "list",
                items: [
                    "Slice seed any thin or bare lawn areas",
                    "Core aerate and overseed the entire lawn",
                    "Plant new evergreen trees and shrubs",
                    "Water Plants deeply in dry weather",
                    "Schedule your fall fertilization",
                    "Start planning to protect broadleaved evergreens from deer damage and winter injury",
                ],
            },
            {
                type: "paragraph",
                html: "As usual, if you need any help or tips, just give us a call and we will be happy to help!",
            },
        ],
    },
    {
        slug: "landscaping-worth-investment",
        title: "Is Landscaping Worth the Investment?",
        date: "2013-09-16",
        excerpt:
            "When thinking about whether or not landscaping is worth the investment, one thing to certainly think about is the work you put into making the inside of…",
        blocks: [
            {
                type: "paragraph",
                html: "When thinking about whether or not landscaping is worth the investment, one thing to certainly think about is the work you put into making the inside of your home impressionable to guests. One could make the same argument that the outside of your home should like equally, if not more, attention drawing and neat compared to the inside of your home. However, many home owners struggle to grasp that landscaping projects are worth the investment they require. Landscaping is worth the investment not only for curb appeal reasons, but for financial benefits as well.",
            },
            {
                type: "image",
                src: "/images/blog/landscaping-worth-investment/dsc05791.jpg",
                width: 2592,
                height: 1722,
                alt: "dsc05791",
            },
            {
                type: "paragraph",
                html: "In short, landscape design projects are a good investment. Not only do they quite often provide a return on investment, but they also adds to the curb appeal of your home. A really good landscape design project can add anywhere from 20 to 30 percent to the value of your home and easily increase your curb appeal. These types of things are especially important when it comes time to selling your home. Landscaping projects bring attention to home buyers and can overall reduce the amount of time your home is on the market. This also means you can retrieve a higher sale price for your home with the landscaping project complete.",
            },
            {
                type: "paragraph",
                html: "For more information on how Hanson Landscape can make a landscaping project worth the investment, explore our site or give us a call today!",
            },
        ],
    },
    {
        slug: "landscaper-of-the-year",
        title: "Landscaper of the Year",
        date: "2013-09-04",
        excerpt:
            "Hanson Landscape has recently received a nomination as a finalist for Landscaper of the Year through Total Landscape Care Magazine.",
        blocks: [
            {
                type: "paragraph",
                html: "Hanson Landscape has recently received a nomination as a finalist for Landscaper of the Year through <em>Total Landscape Care</em> Magazine. The program recognizes the best landscapers in North America and is presented by Case Construction Company. Hanson Landscape has been chosen as one of the twelve best landscaping companies in North America and we will have our company history and story featured in <em>Total Landscape Care </em>Magazine in their landscaper of the year section at some point in 2014.",
            },
            {
                type: "paragraph",
                html: 'Some of the factors that go into picking the finalists are portfolio of work, services offered, business techniques, community involvement and what sets them apart from others in the industry. The finalists all get a full-length magazine article with photos of their projects. We are honored to receive a nomination as a finalist and look forward to meeting with a representative and eventually seeing the final results! For more information on the Landscaper of the Year contest, <a href="http://www.totallandscapecare.com/category/microsite-landscaper-of-the-year/landscaper-of-the-year/" target="_blank" rel="noopener noreferrer">click here</a>.',
            },
        ],
    },
    {
        slug: "hanson-landscape-on-linkedin",
        title: "Hanson Landscape on LinkedIn",
        date: "2013-08-26",
        excerpt:
            "Hanson Landscape, as well as our general contractor company Global Power and Construction, and our biohazard recovery company Global Priority Cleanup…",
        blocks: [
            {
                type: "paragraph",
                html: 'Hanson Landscape, as well as our <a href="http://www.globalpowerconstruction.com/" target="_blank" rel="noopener noreferrer">general contractor</a> company Global Power and Construction, and our <a href="http://www.globalprioritycleanup.com/" target="_blank" rel="noopener noreferrer">biohazard recovery</a> company Global Priority Cleanup have all joined LinkedIn recently. LinkedIn is a great option for a company to use to develop professional relationships in a social media type setting. As opposed to Facebook or Twitter, LinkedIn has more of a professional look and feel as each profile has details about a person’s work history and skills.',
            },
            {
                type: "paragraph",
                html: "We are excited to have a LinkedIn Page for each company as we can keep in touch with business associates and keep them updated on each company. To check out Hanson Landscape on LinkedIn, click the link and follow us if you would like to keep updated!",
            },
            {
                type: "paragraph",
                html: '<a href="http://www.linkedin.com/company/3298959?trk=tyah" target="_blank" rel="noopener noreferrer">Hanson Landscape on LinkedIn</a>',
            },
        ],
    },
    {
        slug: "snow-removal-services",
        title: "Snow Removal Services",
        date: "2013-08-06",
        excerpt:
            "Although it is only August, it is a perfect time to begin considering snow removal services and needs.",
        blocks: [
            {
                type: "paragraph",
                html: 'Although it is only August, it is a perfect time to begin considering <a href="/snow-and-ice-management">snow removal</a> services and needs. It is always a good idea to keep ahead of schedule for the brutal winters of Illinois, and this is the main reason we keep in touch with all of our snow removal customers. Some other reasons for considering snow removal this early in the season are things such as:',
            },
            {
                type: "list",
                items: [
                    '<a href="/contact">Estimates</a> of snow removal cost',
                    "Desired piling area",
                    "Overview of the area to avoid certain objects when covered in snow",
                    "Knowledge of walkways and paths to avoid ice buildup",
                    "Knowledge of property lines and surface types",
                ],
            },
            {
                type: "paragraph",
                html: 'There are other numerous reasons to begin considering your snow removal services and needs in the middle or summer months of the year as well. When a large storm hits, it is always a wise decision to be prepared and have a professional snow removal company ready to keep your property safe and accessible. Contact us today if you would like to hear about our services or visit our <a href="/snow-and-ice-management">snow removal</a> services page for more information. The last thing anybody wants to be is stuck either in their home or their business when a brutal winter storm hits, therefore it is always a great idea to be prepared well ahead of time.',
            },
        ],
    },
    {
        slug: "snow-removal",
        title: "Snow Removal",
        date: "2013-08-06",
        excerpt: "Although it is only August, it is a perfect time to begin considering snow removal needs.",
        blocks: [
            {
                type: "paragraph",
                html: 'Although it is only August, it is a perfect time to begin considering <a href="/snow-and-ice-management">snow removal</a> needs. It is always a good idea to keep ahead of schedule for the brutal winters of Illinois, and this is the main reason we keep in touch with all of our snow removal customers. Some other reasons for considering snow removal this early in the season are things such as:',
            },
            {
                type: "list",
                items: [
                    '<a href="/contact">Estimates</a> of snow removal cost',
                    "Desired piling area",
                    "Overview of the area to avoid certain objects when covered in snow",
                    "Knowledge of walkways and paths to avoid ice buildup",
                    "Knowledge of property lines and surface types",
                ],
            },
            {
                type: "paragraph",
                html: 'There are other numerous reasons to begin considering your snow removal needs in the middle or summer months of the year as well. When a large storm hits, it is always a wise decision to be prepared and have a professional snow removal company ready to keep your property safe and accessible. Contact us today if you would like to hear about our services or visit our <a href="/snow-and-ice-management">snow removal</a> page for more information. The last thing anybody wants to be is stuck either in their home or their business when a brutal winter storm hits, therefore it is always a great idea to be prepared well ahead of time.',
            },
        ],
    },
    {
        slug: "august-landscape-checklist",
        title: "August Landscape Checklist",
        date: "2013-08-01",
        excerpt: "Here is the landscaping checklist for August provided once again by Autumn Tree:",
        blocks: [
            {
                type: "paragraph",
                html: "Here is the landscaping checklist for August provided once again by Autumn Tree:",
            },
            {
                type: "list",
                items: [
                    "Keep fruit trees nourished and watered",
                    "Cut back old brambles when plants finish bearing fruits and vegetables",
                    "Order your tree, shrub, perennial and build stocks for fall planting",
                    "Sow perennials and biennials for blooming next year",
                    "Schedule pruning for hazard reduction",
                ],
            },
            {
                type: "paragraph",
                html: "As always, Hanson Landscape can help with many of these tasks and will perform them in the most professional and complete manner possible. Let us know if you have any landscaping needs!",
            },
        ],
    },
    {
        slug: "grubs-and-their-effects",
        title: "Grubs and Their Effects",
        date: "2013-07-30",
        excerpt: "Grubs are an unpleasant occurrence every year for anybody with grass on their property.",
        blocks: [
            {
                type: "paragraph",
                html: "Grubs are an unpleasant occurrence every year for anybody with grass on their property. Grubs are larvae from beetles that usually lay eggs twice a year in the between spring and late summer. Upon hatching, the grubs begin eating at the roots of grass until they have matured. Typical signs of grubs existing in grass are patches of dead grass throughout the lawn. Certain types of wildlife may also be attracted to the areas of grubs, which is a good indicator of the problem. If there is a large amount of grubs in a certain area, the grass may begin to roll up like carpeting and be easily pulled up.",
            },
            {
                type: "image",
                src: "/images/blog/grubs-and-their-effects/grubturf.jpg",
                width: 250,
                height: 202,
                alt: "grubturf",
            },
            {
                type: "image",
                src: "/images/blog/grubs-and-their-effects/grub-damage.jpg",
                width: 330,
                height: 247,
                alt: "grub damage",
            },
            {
                type: "paragraph",
                html: 'Once a lawn is tested for grubs and comes back positive, there are different ways to treat the problem. The most common of these treatments is chemical treatment. Pesticides are used in the damaged areas of grass to help rid the grubs from the soil. It is recommended that these pesticides be used between the dates of August 1 and September 15. You should also apply water over the pesticides to ensure that it reaches the soil. Hanson Landscape does offer a <a href="/portfolio">treatment for grubs</a>, for more information give us a call or email. Grubs and their effects that come with them are certainly an unnecessary evil and we are here to help!',
            },
        ],
    },
    {
        slug: "customer-service-and-taking-the-extra-steps",
        title: "Customer Service and Taking the Extra Steps",
        date: "2013-07-26",
        excerpt: "Here at Hanson Landscape, we are continually striving to go above and beyond customer expectations.",
        blocks: [
            {
                type: "paragraph",
                html: "Here at Hanson Landscape, we are continually striving to go above and beyond customer expectations. Our customers are the most important feature of our business and we do not take this for granted. Due to the fact that we are always trying to improve, we came across an article from the NAAHQ written by Mary Gwyn that provided some steps that we will begin to follow to improve our services and enhance customer’s curb appeal even further.",
            },
            {
                type: "paragraph",
                html: "Here are some of the steps:",
            },
            {
                type: "list",
                items: [
                    "Drive past the community/service location from multiple directions to make sure that everything on the property is in proper shape",
                    "Evaluate highlights of the property such as signs and entrances and ensure that they have good looking flowers planted around them with a clean bedding of mulch",
                    "Make sure there is grass in all of the areas where grass should be and there are no eye sores on the lawn",
                    "Be sure to keep signs clean and make sure they have good paint on them to attract the eyes of passing pedestrians",
                ],
            },
            {
                type: "paragraph",
                html: 'These are just a few things that we are continually improving at Hanson Landscape when doing things such as <a href="/commercial-landscape-maintenance">landscape maintenance</a> for customers. We want our everybody to judge the “curb by its cover” and let us know if we can do more to make each and every property look better. It is our mission to keep every customer completely satisfied with their entire landscaping scheme and as a company we will continue to improve customer service to make this happen. Give us a call today if you feel we can improve in any way!',
            },
        ],
    },
    {
        slug: "lawn-mowing-tips-for-dry-weather",
        title: "Lawn Mowing Tips for Dry Weather",
        date: "2013-07-15",
        excerpt:
            "Seeing as there is a fairly dry and hot week coming up in our service region, it is only fitting that we share tips for lawn mowing tips for dry weather…",
        blocks: [
            {
                type: "paragraph",
                html: "Seeing as there is a fairly dry and hot week coming up in our service region, it is only fitting that we share tips for lawn mowing tips for dry weather such as when there has been a lack of rain for some time, as it has been recently. The first and foremost suggestion to be made is to be sure to mow your lawn, even if it does not seem to be growing much. You may think you do not need to mow your lawn because it is not growing like it was in the spring, but not mowing leads to clumpy and uneven grass.",
            },
            {
                type: "image",
                src: "/images/blog/lawn-mowing-tips-for-dry-weather/textures-large-1.jpg",
                width: 2560,
                height: 1707,
                alt: "textures-large-1",
            },
            {
                type: "paragraph",
                html: "Since the grass is likely not as lush and clean cut as in the rainy season, be sure to sharpen your mower blades often to get the cleanest cut possible. Additionally, you should keep the mower blades level to get a nice even cut on the grass. You should also set the mower blades to a higher height to avoid cutting too deep into the grass as this damage could be permanent for the season. Another thing you should avoid is bagging the grass clippings as they can help keep in any moisture that exists in the grass.",
            },
            {
                type: "paragraph",
                html: "For more tips on landscaping maintenance, do not hesitate to call us at (630)-556-4120 or fill out our contact form!",
            },
        ],
    },
    {
        slug: "around-the-office",
        title: "Around the Office",
        date: "2013-07-09",
        excerpt: "Many people don’t know that our office is located in a wooded area in Big Rock, IL.",
        blocks: [
            {
                type: "paragraph",
                html: "Many people don’t know that our office is located in a wooded area in Big Rock, IL. Since we are in this area, we just wanted to share a few pictures of what we see out of our office window on a weekly basis.",
            },
            {
                type: "image",
                src: "/images/blog/around-the-office/office1.jpg",
                width: 397,
                height: 411,
                alt: "Office",
            },
            {
                type: "paragraph",
                html: "Here is a photo of the lawn a day or two after one of our landscape maintenance crews came by to mow it. You can see the large amount of woods and foliage around the office.",
            },
            {
                type: "image",
                src: "/images/blog/around-the-office/deer.jpg",
                width: 2448,
                height: 3264,
                alt: "deer",
            },
            {
                type: "image",
                src: "/images/blog/around-the-office/deer2.jpg",
                width: 578,
                height: 768,
                alt: "deer2",
            },
            {
                type: "paragraph",
                html: "Here are a couple photos of something we see fairly often around the office, deer. We often have many different types of wildlife running throughout the back lot and these are just a couple of instances in which we had time to take pictures of them.",
            },
            {
                type: "paragraph",
                html: "It is safe to say that there is plenty more to be seen in this area and more pictures will be added at a later date!",
            },
        ],
    },
    {
        slug: "july-landscaping-calendar",
        title: "July Landscaping Calendar",
        date: "2013-07-02",
        excerpt:
            "Continuing along with our landscaping calendar from Autumn Tree, here is the landscaping schedule for the month of July.",
        blocks: [
            {
                type: "paragraph",
                html: "Continuing along with our landscaping calendar from Autumn Tree, here is the landscaping schedule for the month of July.",
            },
            {
                type: "list",
                items: [
                    "Perform hand pruning on spring flowering shrubs to maintain shape and stimulate growth",
                    "Weed your garden regularly",
                    "Prune roses for the second bloom",
                    "Treat stressed plants for the heat",
                    "Water lawns once or twice a week if there is infrequent rain",
                    "Raise your height on the lawn mower if you mow your own lawn",
                    "Prune hedges and non-flowering shrubs",
                ],
            },
            {
                type: "paragraph",
                html: "Again, Hanson Landscape can help with many of these tasks, so do not hesitate to call for any landscaping needs!",
            },
        ],
    },
    {
        slug: "portfolio-of-work",
        title: "Portfolio of Work",
        date: "2013-06-25",
        excerpt:
            "In case you haven’t checked out our portfolio yet, now is a good chance to get a glimpse at some of the work we have performed.",
        blocks: [
            {
                type: "paragraph",
                html: 'In case you haven’t checked out our <a href="/portfolio">portfolio</a> yet, now is a good chance to get a glimpse at some of the work we have performed. Since Hanson provides many types of services on different types of properties, we will break it down into categories for you.',
            },
            {
                type: "paragraph",
                html: '<a href="/portfolio"><strong>Commercial Landscaping</strong></a>',
            },
            {
                type: "image",
                src: "/images/blog/portfolio-of-work/portfolio-1.jpg",
                width: 1024,
                height: 769,
                alt: "portfolio 1",
            },
            {
                type: "image",
                src: "/images/blog/portfolio-of-work/portfolio-2.jpg",
                width: 1024,
                height: 769,
                alt: "portfolio 2",
            },
            {
                type: "paragraph",
                html: "Here are a few examples of the commercial landscaping work we have performed throughout the years. In particular, what you see here are landscaping features such as flowers and mulch.",
            },
            {
                type: "paragraph",
                html: '<strong><a href="/portfolio">Residential Landscaping</a></strong>',
            },
            {
                type: "image",
                src: "/images/blog/portfolio-of-work/dsc05764.jpg",
                width: 2592,
                height: 1731,
                alt: "dsc05764",
            },
            {
                type: "image",
                src: "/images/blog/portfolio-of-work/dsc05791.jpg",
                width: 2592,
                height: 1722,
                alt: "dsc05791",
            },
            {
                type: "paragraph",
                html: "Here are a couple examples of residential landscaping projects we have performed. Reminder, we do not do landscape maintenance on residential properties, but we do perform landscaping feature projects and things of the sort.",
            },
            {
                type: "paragraph",
                html: '<a href="/portfolio"><strong>Landscape Maintenance</strong></a>',
            },
            {
                type: "image",
                src: "/images/blog/portfolio-of-work/landscape-maintenance.jpg",
                width: 800,
                height: 455,
                alt: "landscape maintenance",
            },
            {
                type: "image",
                src: "/images/blog/portfolio-of-work/office.jpg",
                width: 397,
                height: 411,
                alt: "Office",
            },
            {
                type: "paragraph",
                html: "Here are a couple examples of some properties that Hanson Landscape maintains yearly. On the right is an example of lawn maintenance performed on Hanson’s office building. The picture was taken of the back lot as you can see the forest in the background.",
            },
            {
                type: "paragraph",
                html: '<a href="/portfolio"><strong>Lighting and Nightscapes</strong></a>',
            },
            {
                type: "image",
                src: "/images/blog/portfolio-of-work/nightscape-21.jpg",
                width: 800,
                height: 600,
                alt: "nightscape 2",
            },
            {
                type: "image",
                src: "/images/blog/portfolio-of-work/nightscape-3.jpg",
                width: 800,
                height: 559,
                alt: "nightscape 3",
            },
            {
                type: "paragraph",
                html: "These are a couple examples of nightscapes and lighting features that Hanson has completed in the past. They certainly add appeal to both properties!",
            },
            {
                type: "paragraph",
                html: '<a href="/portfolio"><strong>Water Features</strong></a>',
            },
            {
                type: "image",
                src: "/images/blog/portfolio-of-work/nightscape-1.jpg",
                width: 800,
                height: 600,
                alt: "nightscape 1",
            },
            {
                type: "paragraph",
                html: "To end with, here are some water features that Hanson has helped create. Both of these waterfalls look great and definitely complete the landscaping scene of each property. We also offer other water features such as fountains that you can see by looking through our complete portfolio.",
            },
        ],
    },
    {
        slug: "project-armor-up-2013",
        title: "Project Armor Up 2013",
        date: "2013-06-19",
        excerpt: "Below is a description of Project Armor Up 2013 given through the Kane County SWAT Team.",
        blocks: [
            {
                type: "paragraph",
                html: 'Below is a description of Project Armor Up 2013 given through the Kane County SWAT Team. Our affiliate company, <a href="http://www.globalprioritycleanup.com/" target="_blank" rel="noopener noreferrer">Global Priority Cleanup</a>, is helping to host the fundraising event to repair their newly acquired, but damaged SWAT vehicle. Please consider helping out the SWAT Team through a donation of any kind. These are the people that protect your lives day in and day out! If you need more information,<a href="mailto:derek@hansonlandscape.com">Email Me</a> or visit the <a href="https://www.facebook.com/pages/Project-Armor-Up-2013/100125746858688" target="_blank" rel="noopener noreferrer">Facebook page</a> and contact us through that method.',
            },
            {
                type: "paragraph",
                html: "Here is the letter from the Kane County SWAT Team:",
            },
            {
                type: "paragraph",
                html: "Kane County S.W.A.T is a 29 member team that consists of 25 officers, 2 paramedics, a Physician Assistant and a Physician. It became a multi-jurisdictional team in 2006 with members from the Kane County Sheriff Office, St. Charles, Geneva, South Elgin, North Aurora, Campton Hills and West Dundee.",
            },
            {
                type: "paragraph",
                html: "Being a part of this team requires additional time away from home in addition to their current duties at their respective departments. Similar to belonging to a sports team, these highly trained men have a true passion for their work and train very hard to protect the communities that they serve. They attend training days, special classes, and special events. This allows them to focus training and be better prepared to protect our community.",
            },
            {
                type: "paragraph",
                html: "However, the cost of training and special equipment exceeds what our local departments can handle. The team is currently supported by private fundraisers that account for approximately  50-75% of its operating funds with supporters like you.",
            },
            {
                type: "paragraph",
                html: "The team has recently acquired a Mamba armored vehicle at no charge from the US military. The Mamba is a South African armored personnel carrier that offers protection against small arms fire and land mines. The vehicle is suited for rough terrain and can carry up to 10 passengers plus the driver. The vehicles were originally supplied to the United States Military to be given to a civilian contractor, Parsons, which was under contract to the military between 2004 and 2010 to undertake mine clearing operations. The original purchase price of this vehicle was close to $400,000.",
            },
            {
                type: "paragraph",
                html: "The condition of the vehicle we received was rough at best but the armor was perfectly usable. This year we will be raising funds to restore this vehicle. It will be a great addition to the team, offering the team member protection when they are going into harm’s way.",
            },
            {
                type: "paragraph",
                html: "We are currently planning our first fundraising campaign, Project Armor Up 2013, hosted by Kane County S.W.A.T. and Global Priority Clean-up.   The Benefit Dinner will be Saturday, November 2<sup>nd</sup>, 2013 and the success of this event will be depend on our ability to acquire items and services to offer for silent and live auctions.   We greatly need and would appreciate your help.  Your donation of monetary assistance, items, and/or services will be tax deductible, according to the provision of the IRS, and a receipt will be provided for your records.",
            },
        ],
    },
    {
        slug: "retaining-walls",
        title: "Retaining Walls",
        date: "2013-06-17",
        excerpt:
            "Retaining walls are a great way to not only resist the pressure of soil or rocks, but they also add visual appeal to any landscaping scene.",
        blocks: [
            {
                type: "paragraph",
                html: "Retaining walls are a great way to not only resist the pressure of soil or rocks, but they also add visual appeal to any landscaping scene. Retaining walls are essentially structures designed to go against the lateral pressure that soil or other material has. A retaining wall counters this pressure and keeps the soil or material in place and is usually met with a level surface on the other side.",
            },
            {
                type: "paragraph",
                html: "While there are many types of retaining walls, they all tend to add to the visual appeal of any landscaping that a home or business may have. The examples shown below display both the retaining features of the wall as well as the visual appeal that each retaining wall adds either through color, brick type, or other features.",
            },
            {
                type: "image",
                src: "/images/blog/retaining-walls/vintage-2.jpg",
                width: 988,
                height: 470,
                alt: "Retaining Wall",
            },
            {
                type: "image",
                src: "/images/blog/retaining-walls/images1.jpg",
                width: 260,
                height: 194,
                alt: "Retaining Wall",
            },
            {
                type: "image",
                src: "/images/blog/retaining-walls/charlotte-retaining-walls.jpg",
                width: 450,
                height: 299,
                alt: "retaining-walls",
            },
            {
                type: "paragraph",
                html: "As seen through these pictures, there are many materials and colors that retaining walls can be created with. All of them add to the visual appeal of the landscaping scheme in each photo. Overall, retaining walls serve as a double positive as they will also separate two surfaces of your choosing. If you have any needs in this area, do not hesitate to call Hanson Landscape today!",
            },
        ],
    },
    {
        slug: "landscaping-maintenance-what-is-included",
        title: "Landscaping Maintenance-What is Included?",
        date: "2013-06-12",
        excerpt:
            "The term “landscaping maintenance” can lead one to believe it includes a number of different services, but is a fairly vague term.",
        blocks: [
            {
                type: "paragraph",
                html: "The term “landscaping maintenance” can lead one to believe it includes a number of different services, but is a fairly vague term. Here at Hanson Landscape, our landscaping maintenance services include mowing, pruning, tree removal, edging, cultivation, fertilization, and broadleaf application. While a few of these terms are obvious landscaping terms that most people know about, such as mowing and tree removal, many people do not truly know what the other services entail.",
            },
            {
                type: "paragraph",
                html: "Pruning is the fairly common and well-known service of removing parts of a plant such as limbs, roots and other parts. It is performed for reasons such as keeping plant health, reducing falling branch risks, and removing dead or diseased portions of the plant, as well as other reasons. Another service that Hanson performs in their landscaping maintenance services often is edging. Edging is simply creating an edge around a desired area using tools such as a spade or edger. This is done to draw the line between your landscaping features and other things such as your lawn. Generally mulch or topsoil is placed inside the edged area to add visual appeal to the landscaping features.",
            },
            {
                type: "paragraph",
                html: "Cultivation is the preparation of the ground to promote the growth of plants. It also involves tending, improving, and harvesting crops or plants if this is necessary. Fertilization is another common term and very well-known procedure of either spreading or spraying fertilizer to keep grass healthy and weeds from growing. This is a very important process for your lawn since there are a multitude of problems that can arise from unhealthy grass. The last landscape maintenance job type that Hanson performs is broadleaf application. This goes hand in hand with fertilization as it is essentially a control process for getting rid of weeds. It involves broadleaf herbicides that spread to the plants roots and result in the death of weeds.",
            },
            {
                type: "paragraph",
                html: 'For an overall view of all of the services Hanson Landscape offers as well as a full coverage of the landscape maintenance services, visit our <a href="/commercial-services">services</a> page and the rest of our site as well.',
            },
        ],
    },
    {
        slug: "the-uses-and-benefits-of-brick-pavers",
        title: "The Uses and Benefits of Brick Pavers",
        date: "2013-06-04",
        excerpt: "Many individuals have either walked on or seen brick pavers at some point in their lives.",
        blocks: [
            {
                type: "paragraph",
                html: "Many individuals have either walked on or seen brick pavers at some point in their lives. However, not many people understand the benefits other than the visual appeal of the bricks. Brick pavers have numerous benefits other than the obvious visual landscaping upgrade that they offer. Brick pavers are at their best use in high traffic areas such as driveways or walkways. The reasoning for this is the bricks ability to withstand a great amount of pressure and weight which is useful for these types of areas.",
            },
            {
                type: "image",
                src: "/images/blog/the-uses-and-benefits-of-brick-pavers/brick-pavers-1.jpg",
                width: 341,
                height: 457,
                alt: "Brick Pavers 1",
            },
            {
                type: "paragraph",
                html: "Brick pavers are a common substitute in landscaping scenes for concrete. The reasoning for substituting brick pavers in for the concrete is the durability of the brick. Due to the fact that brick pavers interlock, they are able to adapt to the shifting of the ground underneath them which is a problem with concrete. Brick pavers also provide durability in their color as they hold their color much longer than decorated concrete. Overall, pavers are a better choice than concrete due to their low cost of maintenance and much cheaper cost of repair or replacement.",
            },
            {
                type: "paragraph",
                html: 'Another benefit of pavers is their non-slip tendencies when compared to concrete. This is due to their abrasive texture which helps lessen the slipping feeling when wet as compared to concrete which is much more slippery when wet. Additionally, brick pavers are much easier to clean than concrete since their colors are natural and will not stain and other color damage. To learn about all of our services, visit our <a href="/residential-services">services</a> page or contact us today!',
            },
        ],
    },
    {
        slug: "june-landscape-checklist",
        title: "June Landscape Checklist",
        date: "2013-05-28",
        excerpt:
            "Now that we are just a few days away from June, it is time for me to provide you with the June landscaping checklist in order to stay on schedule.",
        blocks: [
            {
                type: "paragraph",
                html: 'Now that we are just a few days away from June, it is time for me to provide you with the June landscaping checklist in order to stay on schedule. This month’s checklist is given, again, by <a href="http://www.autumntree.com" target="_blank" rel="noopener noreferrer">Autumn Tree</a>.',
            },
            {
                type: "list",
                items: [
                    "Harvest early crops, plant successions of salad and root crops",
                    "Cover ripening berries with netting to protect from birds",
                    "Divide spring bulbs that are crowding",
                    "Replant herb garden with new seedlings",
                    "Keep a close watch for pests and diseases on trees, shrubs, and lawn, and schedule treatments as necessary",
                    "Arrange for a storm damage risk audit",
                ],
            },
            {
                type: "paragraph",
                html: 'As always, you can contact <a href="/contact">Hanson Landscape</a> for many of these landscaping needs or for any other inquiries you may have. Check back in July for the checklist for that month to keep up with your landscaping schedule.',
            },
        ],
    },
    {
        slug: "landscaping-ideas-to-consider",
        title: "Landscaping Ideas to Consider",
        date: "2013-05-21",
        excerpt: "Seeing as spring is in full swing, it is time to fulfill your overall landscaping needs.",
        blocks: [
            {
                type: "paragraph",
                html: "Seeing as spring is in full swing, it is time to fulfill your overall landscaping needs. However, many people are bored with the look of their yard, garden or other landscaping features. So, what can be done to spruce up  the look of your home or business this spring? Here are some ideas to consider.",
            },
            {
                type: "image",
                src: "/images/blog/landscaping-ideas-to-consider/farnsworth-landscaping-steps1.jpg",
                width: 872,
                height: 583,
                alt: "farnsworth-landscaping-steps1",
            },
            {
                type: "image",
                src: "/images/blog/landscaping-ideas-to-consider/35-garden-ponds-and-waterfalls.jpg",
                width: 660,
                height: 500,
                alt: "35-garden-ponds-and-waterfalls",
            },
        ],
    },
    {
        slug: "hanson-receives-unilock-century-club-award",
        title: "Hanson Receives Unilock Century Club Award",
        date: "2013-05-14",
        excerpt:
            "In recent news around the office, Hanson Landscape has just received their Unilock Century Club Award in recognition of outstanding sales performance for…",
        blocks: [
            {
                type: "paragraph",
                html: "In recent news around the office, Hanson Landscape has just received their Unilock Century Club Award in recognition of outstanding sales performance for 2012. This is the second straight year that Hanson Landscape has won this award and they are proud to use Unilock’s products for their projects. Here is a photo of the award:",
            },
            {
                type: "image",
                src: "/images/blog/hanson-receives-unilock-century-club-award/unilock-award.jpg",
                width: 2448,
                height: 3264,
                alt: "UNILOCK award",
            },
        ],
    },
    {
        slug: "mulch-why-and-how-much",
        title: "Mulch – Why and How Much?",
        date: "2013-05-09",
        excerpt:
            "As you already know, mulch is simply material placed over a soil surface for multiple reasons. But what are these reasons?",
        blocks: [
            {
                type: "paragraph",
                html: 'As you already know, mulch is simply material placed over a soil surface for multiple reasons. But what are these reasons? Why pay money just to have something cover your soil? According to the <a href="http://mulch-masters.com/index_files/benefitsmulch.htm" target="_blank" rel="noopener noreferrer">Mulch Masters</a>, the benefits of proper mulching are numerous. Mulch helps maintain soil moisture which reduces the need to water plants and trees and also helps fight off the germination of weeds while also serving as a type of insulation. It keeps soil warm in the winter and cool in the summer for ideal growing conditions.',
            },
            {
                type: "paragraph",
                html: "Depending on the  type of mulch that is being used, it can improve soil aeration, soil fertility, and reduce the likelihood of plant disease. Additionally, mulch helps prevent weed whacker and lawn mower damage to soil and plants as it surrounds and covers these things. Adding onto these benefits, mulch gives a visual benefit to users as well. Mulch gives a well groomed and maintained look to a landscape setting.",
            },
            {
                type: "paragraph",
                html: "When applying mulch, it is important to use the correct amount as it could be harmful if too much is used. The amount that is generally recommended to apply is 2 to 4 inches. Applying too much mulch can lead to an excessive amount of moisture. It can also create habitats for rodents, prevent penetration of water and air and may actually support weed growth. If your business or home needs mulching and you have any questions or want a professional service, don’t hesitate to contact us!",
            },
        ],
    },
    {
        slug: "general-information-on-lawn-mowing",
        title: "General Information on Lawn Mowing",
        date: "2013-05-06",
        excerpt:
            "Many individuals that maintain their own yards and landscaping are not truly aware of the correct timing and length at which to mow their grass.",
        blocks: [
            {
                type: "paragraph",
                html: "Many individuals that maintain their own yards and landscaping are not truly aware of the correct timing and length at which to mow their grass. This information is especially important as it is now lawn mowing season and nobody wants to have the ugly lawn of the neighborhood. Below is a summary of the different aspects of your lawn to consider when deciding how often and what length to mow your lawn at.",
            },
            {
                type: "paragraph",
                html: "Timing: It is recommended that a lawn gets mowed every 4-10 days depending on factors such as the type of grass and the amount of rainfall received in the time between mows. Since most individuals that take care of their lawns generally have to mow on the weekends due to their schedules, it is important that they mow the lawn in this time frame to keep their yard healthy and good looking.",
            },
            {
                type: "paragraph",
                html: "Length: It is recommended that in the summer, grass is kept at 2 to 3 inches to minimize heat damage on the grass. It is general rule of thumb to cut about one third of the length of final desired height of the grass. For example, if your grass is four inches high, you will want to cut an inch off when mowing which is a third of the final measurement of three inches. Removing more than a third may cause the lawn to become thin which could lead to multiple problems down the road such as poor appearance and disease.",
            },
            {
                type: "paragraph",
                html: "General tips: Avoid mowing the grass when it is wet and also avoid mowing when you have dull mower blades because these things result in a poor looking cut. If your lawn mowing schedule gets away from you, mow more frequently while slightly decreasing the height each time to bring the grass back under control.",
            },
            {
                type: "paragraph",
                html: 'For more information, <a href="http://www.ehow.com/info_7958006_should-mow-lawn.html" target="_blank" rel="noopener noreferrer">here</a> is a link to an article going more in depth on each of these points. Also, if you do not have the time to mow your lawn regularly, consider giving Hanson Landscape a call at (630) 556-4120 today.',
            },
        ],
    },
    {
        slug: "nightscapes-what-are-they",
        title: "Nightscapes: what are they?",
        date: "2013-05-02",
        excerpt:
            "Nightscapes are an effective way to pick out details around your home or business and obscure other details through the use of light.",
        blocks: [
            {
                type: "paragraph",
                html: "Nightscapes are an effective way to pick out details around your home or business and obscure other details through the use of light. Nightscapes essentially make a portion of your home or business shine in the night hours. They are very effective to highlight certain portions of your home or business. Whether it be the entrance of your home or business, the sidewalk, a fountain or waterfall, or some other landscaping area that you wish to highlight, nightscapes are a very visually effective tool to draw attention to your particular place of interest. Here are some examples of nightscapes and lightscapes that Hanson has completed.",
            },
            {
                type: "image",
                src: "/images/blog/nightscapes-what-are-they/nightscape-1.jpg",
                width: 800,
                height: 600,
                alt: "nightscape 1",
            },
            {
                type: "image",
                src: "/images/blog/nightscapes-what-are-they/nightscape-2.jpg",
                width: 800,
                height: 600,
                alt: "nightscape 2",
            },
            {
                type: "paragraph",
                html: "As you can easily see through these examples, nightscapes and lighting in general, draw a large amount of visual attention from the viewer. They are a great way to highlight your landscaping work or the highlight of your home or business.",
            },
        ],
    },
    {
        slug: "may-landscape-checklist",
        title: "May Landscape Checklist",
        date: "2013-04-30",
        excerpt:
            "Spring is officially here in the Midwestern area, and it is important to keep up to date on all of your landscaping needs.",
        blocks: [
            {
                type: "paragraph",
                html: "Spring is officially here in the Midwestern area, and it is important to keep up to date on all of your landscaping needs. Whether it be around the house or at work, there are always projects that can be done to make the look of your home or business more attractive. This is important in scenarios such as making a first impression on a guest or customer and setting the mood for a place of business. With the month of May coming up very soon, we find it important to highlight the general landscaping guidelines for the month according to Autumn Tree.",
            },
            {
                type: "list",
                items: [
                    "Plant new perennials and summer bulbs",
                    "Divide mums and other late bloomers",
                    "Plant annuals after last frost",
                    "Increase mowing frequency as turf growth increases. Don’t cut off more than 1/3 of the grass plant per mowing",
                    "Schedule spring core aeration",
                    "Perform preventative disease treatments to foliage of susceptible trees/shrubs",
                ],
            },
            {
                type: "paragraph",
                html: "These guidelines are important for individuals looking to keep up on their landscaping tasks and keeping their home or business looking the best it possibly can. For the entire calendar you can visit the Autumn Tree web site. Additionally, Hanson Landscaping can help out with any of these landscaping needs.",
            },
        ],
    },
];

/** Legacy duplicate slugs -> canonical slug. */
export const BLOG_SLUG_ALIASES: Record<string, string> = {
    "lawn-mowing-tips-for-dry-weather-2": "lawn-mowing-tips-for-dry-weather",
    "landscaping-ideas-to-consider-2": "landscaping-ideas-to-consider",
    "hanson-receives-unilock-century-club-award-2": "hanson-receives-unilock-century-club-award",
};

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
    return BLOG_POSTS.find((post) => post.slug === slug);
}

export function formatPostDate(iso: string): string {
    return new Date(iso + "T12:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

/** Newer / older neighbours in the date-sorted list. */
export function getAdjacentPosts(slug: string): { newer?: BlogPost; older?: BlogPost } {
    const index = BLOG_POSTS.findIndex((post) => post.slug === slug);
    return { newer: BLOG_POSTS[index - 1], older: BLOG_POSTS[index + 1] };
}
