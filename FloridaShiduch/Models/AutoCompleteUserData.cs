using FloridaShiduch.Models.Profile;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FloridaShiduch.Models
{
    public class AutoCompleteUserData : IDisposable
    {

        private string userId;

        private ApplicationDbContext context = new ApplicationDbContext();

        private readonly List<string> PAGE_ORDER = new List<string> {
            "Start",
            "Demographics",
            "Background",
            "Lifestyle",
            "Occupation",
            "Personal",
            "Essays",
            "Spouse",
            "References",
            "Edit"
        };

        public AutoCompleteUserData(string userid, int pages)
        {
            userId = userid;

            CompleteInvoker(pages);
        }

        public void CompleteInvoker(int levels)
        {
            Type thisType = Type.GetType("FloridaShiduch.Models.AutoCompleteUserData");

            for (int i = 0; i < levels; i++)
            {
                if (i > 0 && i < levels - 1)
                    thisType.GetMethod("Complete" + PAGE_ORDER[i]).Invoke(this, new object[] { });

                SetProgress(PAGE_ORDER[i].ToLower());
            }
        }

        #region CompleteMethods
        public void SetProgress(string module)
        {
            context.ModulesProgress.Add(new ModuleProgress
            {
                UserId = userId,
                Module = module,
                Status = true
            });
        }

        public void CompleteDemographics()
        {
            context.Demographics.Add(new Demographic
            {
                UserId = userId,
                FirstName = "Gary",
                LastName = "Kaganas",
                Gender = "M",
                Address = "1045 NE 179th Terr.",
                City = "North Miami Beach",
                State = "FL",
                Zip = "33162",
                HomePhone = "3057649369"
            });
        }

        public void CompleteBackground()
        {
            context.Backgrounds.Add(new Background
            {
                UserId = userId,
                BornJewish = true,
                BaalTeshuva = true,
                BTTime = 10,
                IsKohen = true,
                Ethnicity = "ashkenaz",
                Observance = "modern"
            });
        }

        public void CompleteLifestyle()
        {
            context.Lifestyles.Add(new Lifestyle
            {
                UserId = userId,
                LearnFrequency = "daily",
                ShulFrequency = "daily",
                Kashrus = "always"
            });
        }

        public void CompleteOccupation()
        {
            context.OccupationsTypes.Add(new OccupationType
            {
                UserId = userId,
                Type = "working"
            });

            context.Occupations.Add(new Occupation
            {
                UserId = userId,
                HebrewEducationLevel = "yeshiva",
                YeshivaPrincipal = "Rabbi Gershenfeld",
                YeshivaLocation = "Har Nof",
                IsraelStudy = true,
                IsraelDuration = 1.5,
                SecularEducationLevel = "masters",
                College = "FIU",
                Degree = "High Energy Physics",
                JobTitle = "Tech Lead"
            });
        }

        public void CompletePersonal()
        {
            context.Personals.Add(new Personal
            {
                UserId = userId,
                Birthday = new DateTime(1982, 3, 24),
                Feet = 5,
                Inches = 9,
                Build = "average",
                MaritalStatus = "married",
                Children = true,
                ChildrenNumber = 2,
                Pets = false,
                Smoke = false
            });
        }

        public void CompleteEssays()
        {
            context.Essays.Add(new Essay
            {
                UserId = userId,
                Character = "You are a captive audience while sitting on the toilet, pet me attempt to leap between furniture but woefully miscalibrate and bellyflop onto the floor; what's your problem? i meant to do that now i shall wash myself intently and who's the baby, but terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry. Cat fur is the new black love and coo around boyfriend who purrs and makes the perfect moonlight eyes so i can purr and swat the glittery gleaming yarn to him (the yarn is from a $125 sweater) and refuse to leave cardboard box have a lot of grump in yourself because you can't forget to be grumpy and not be like king grumpy cat. Cat snacks wake up human for food at 4am. All of a sudden cat goes crazy. Adventure always mew wake up human for food at 4am yet hide head under blanket so no one can see but sun bathe reward the chosen human with a slow blink. Sit and stare. Chew iPad power cord lick butt, yet jump around on couch, meow constantly until given food, sniff catnip and act crazy but sweet beast, yet i just saw other cats inside the house and nobody ask me before using my litter box. Pet right here, no not there, here, no fool, right here that other cat smells funny you should really give me all the treats because i smell the best and omg you finally got the right spot and i love you right now cough so cat not kitten around , meow meow, i tell my human jump off balcony, onto stranger's head. The door is opening! how exciting oh, it's you, meh. Put butt in owner's face with tail in the air so kitten is playing with dead mouse purrrrrr, run outside as soon as door open and my left donut is missing, as is my right scratch at fleas, meow until belly rubs, hide behind curtain when vacuum cleaner is on scratch strangers and poo on owners food. Sleep nap i'm bored inside, let me out i'm lonely outside, let me in i can't make up my mind whether to go in or out, guess i'll just stand partway in and partway out, contemplating the universe for half an hour how dare you nudge me with your foot?!?! leap into the air in greatest offense! white cat sleeps on a black shirt yet flop over. Chase laser.",
                SpecialInterests = "Lick arm hair relentlessly pursues moth so demand to be let outside at once, and expect owner to wait for me as i think about it, steal the warm chair right after you get up with tail in the air yet steal the warm chair right after you get up climb a tree, wait for a fireman jump to fireman then scratch his face. Chew foot. Paw at beetle and eat it before it gets away jumps off balcony gives owner dead mouse at present then poops in litter box snatches yarn and fights with dog cat chases laser then plays in grass finds tiny spot in cupboard and sleeps all day jumps in bathtub and meows when owner fills food dish the cat knocks over the food dish cat slides down the water slide and into pool and swims even though it does not like water this human feeds me, i should be a god for spread kitty litter all over house. Poop in a handbag look delicious and drink the soapy mopping up water then puke giant foamy fur-balls cough hairball on conveniently placed pants so lick face hiss at owner, pee a lot, and meow repeatedly scratch at fence purrrrrr eat muffins and poutine until owner comes back cat dog hate mouse eat string barf pillow no baths hate everything so cough furball into food bowl ",
                SpouseCharacter = "Cats go for world domination love and coo around boyfriend who purrs and makes the perfect moonlight eyes so i can purr and swat the glittery gleaming yarn to him (the yarn is from a $125 sweater) i just saw other cats inside the house and nobody ask me before using my litter box human give me attention meow. Chase ball of string i shredded your linens for you burrow under covers lick left leg for ninety minutes, still dirty but caticus cuteicus. Slap kitten brother with paw hate dog, yet that box? i can fit in that box or wake up human for food at 4am, meow to be let out instantly break out into full speed gallop across the house for no reason. Wack the mini furry mouse suddenly go on wild-eyed crazy rampage."
            });
        }

        public void CompleteSpouse()
        {
            context.Spouses.Add(new Spouse
            {
                UserId = userId,
                MinAge = 25,
                MinFeet = 4,
                MinInches = 5,
                MaxAge = 36,
                MaxFeet = 6,
                MaxInches = 0,
                HebrewEducationLevel = "seminary",
                SecularEducationLevel = "bachelors",
                AllowChildren = true,
                TV = "true",
                Aliyah = true
            });
        }

        public void CompleteReferences()
        {
            context.References.AddRange(new List<Reference> 
            {
                new Reference
                {
                    UserId = userId,
                    Rank=1,
                    Name="Sima Kaganas",
                    Phone="3052132009",
                    CityAndState="North Miami Beach, FL",
                    Relationship="Wife"
                },
                new Reference
                {
                    UserId = userId,
                    Rank=2,
                    Name="Zully Kaganas",
                    Phone="3052132009",
                    CityAndState="North Miami Beach, FL",
                    Relationship="Mother"
                },
                new Reference
                {
                    UserId = userId,
                    Rank=1,
                    Name="Rabbi Gershenfeld",
                    Phone="3052132009",
                    CityAndState="Har Nof, Jerusalem, Israel",
                    Relationship="Rabbi"
                }
            });
        }
        #endregion

        #region NOTUSED
        public void CompleteDescription()
        {
            context.Descriptions.Add(new Description
            {
                UserId = userId,
                PersonalDescription = "A happily married guy that has no business in a dating site."
            });
        }

        public void CompleteFamily()
        {
            context.Familys.Add(new Family
            {
                UserId = userId,
                MotherName = "Zully",
                MotherGer = false,
                FatherName = "Israel",
                FatherGer = false,
                Shul = "Shaaray Tefilah",
                SibilingsNumber = 3
            });
        }

        public void CompleteMaritalStatus()
        {
            context.MaritalStatuses.Add(new MaritalStatus
            {
                UserId = userId,
                Status = "married"
            });
        }
        #endregion

        public void Save()
        {
            context.SaveChanges();
        }

        public void Dispose()
        {
            context.Dispose();
        }
    }
}