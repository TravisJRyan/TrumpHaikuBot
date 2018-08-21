# TrumpHaikuBot
A Twitter bot that generates haikus from the tweets of @realDonaldTrump

Tweets are screened through a dashboard which generates possible (often non-haiku) tweets using a syllable-counting node module. Once valid haikus are accepted, they are queued in a remote MySql database where a virtual machine has a cron job that tweets every 8 hours at @TrumpHaikuBot1

Screenshots:
